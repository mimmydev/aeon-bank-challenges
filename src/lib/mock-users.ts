import bcrypt from 'bcryptjs';

/**
 * Mock User Database
 * In a real app, this would be in your database
 * For demo purposes, we'll create some test users with pre-hashed passwords
 */

// Pre-hashed passwords for testing (using bcrypt with 10 rounds)
const MOCK_USERS = [
  {
    username: 'mimmy',
    // Password: 'password123'
    hashedPassword:
      '$2b$10$MO06IelUysOIqfyRD0tiK.hkERVZVj7SFclr5OkfBIE8aHo3brM5q',
    email: 'mimmy@example.com',
    role: 'user',
  },
  {
    username: 'admin',
    // Password: 'admin123'
    hashedPassword:
      '$2b$10$3KrD6W3hdLm3yWoiiB4u3.VgBofuoP9sRl3GnKh8UFPeYfXW1npB6',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    username: 'testuser',
    // Password: 'test123'
    hashedPassword:
      '$2b$10$dvkXyqG7Qx19Sao3u3D2T.O5N5lY2ijXAyZkmLDzPaO/R45pYYJlG',
    email: 'test@example.com',
    role: 'user',
  },
  {
    username: 'john',
    // Password: 'john456'
    hashedPassword:
      '$2b$10$KEaJEZdpzjwky9.GDC6k4uLX/rIy1QpYA7HSCpUJQXW6e6xjQ5da2',
    email: 'john@example.com',
    role: 'user',
  },
] as const;

export interface MockUser {
  username: string;
  hashedPassword: string;
  email: string;
  role: string;
}

/**
 * Find user by username
 */
export function findUserByUsername(username: string): MockUser | null {
  return (
    MOCK_USERS.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    ) || null
  );
}

/**
 * Validate user credentials
 */
export async function validateUserCredentials(
  username: string,
  plainPassword: string
): Promise<MockUser | null> {
  const user = findUserByUsername(username);
  if (!user) {
    return null;
  }

  // Compare the plain password with stored hash
  const isValidPassword = await bcrypt.compare(
    plainPassword,
    user.hashedPassword
  );
  if (!isValidPassword) {
    return null;
  }

  return user;
}

/**
 * Validate user credentials with client-hashed password
 * This function handles passwords that have been hashed on the client-side
 */
export async function validateUserCredentialsWithClientHash(
  username: string,
  clientHashedPassword: string
): Promise<MockUser | null> {
  const user = findUserByUsername(username);
  if (!user) {
    return null;
  }

  // For client-hashed passwords, we need to compare against the original plaintext
  // since the client hashes the plaintext and we need to verify it matches our stored hash
  // We'll check if the client hash would produce the same result as our stored hash

  // Get the original password for this user (for demo purposes)
  const originalPassword = getOriginalPasswordForUser(username);
  if (!originalPassword) {
    return null;
  }

  // Verify that the client-hashed password matches what we'd expect
  const isValidClientHash = await bcrypt.compare(
    originalPassword,
    clientHashedPassword
  );
  if (!isValidClientHash) {
    return null;
  }

  return user;
}

/**
 * Get original password for user (for demo purposes only)
 * In a real application, you would not store plaintext passwords
 */
function getOriginalPasswordForUser(username: string): string | null {
  const credentials = TEST_CREDENTIALS as Record<string, string>;
  return credentials[username.toLowerCase()] || null;
}

/**
 * Check if username exists (for getSecureWord validation)
 */
export function userExists(username: string): boolean {
  return findUserByUsername(username) !== null;
}

// Export test credentials for documentation
export const TEST_CREDENTIALS = {
  mimmy: 'password123',
  admin: 'admin123',
  testuser: 'test123',
  john: 'john456',
} as const;
