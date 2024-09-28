declare module "pobble.db" {
  export interface DatabaseEntry {
      Date: {
          Year: string;
          Month: string;
          Day: string;
          Hours: string;
          Minutes: string;
          Seconds: string;
          Full: string;
      };
      Data: {
          Key: string;
          Value: {
              Data: unknown;
              Type: string;
          };
      };
  }
  export class Database {
    constructor(Path: string);

    /**
     * Sets the value for the specified key.
     * If the key already exists, its value will be updated.
     * @param key - The key for the value.
     * @param value - The value to set.
     */
    set(key: string | { Key: string; Value: unknown }, value?: unknown): Promise<void>;

    /**
     * Gets the value for the specified key.
     * @param key - The key for the value.
     * @returns The value associated with the specified key, or undefined if the key does not exist.
     */
    get(key: string): Promise<DatabaseEntry | undefined>;

    /**
     * Deletes the value for the specified key.
     * @param key - The key for the value to delete.
     */
    delete(key: string): Promise<void>;

    /**
     * Gets all key-value pairs in the database.
     * @returns An object containing all key-value pairs.
     */
    all(): Promise<DatabaseEntry[]>;

    /**
     * Checks if a key exists in the database.
     * @param key - The key to check.
     * @returns True if the key exists, otherwise false.
     */
    has(key: string): Promise<boolean>;

    /**
     * Adds a value to the specified key.
     * @param key - The key for the value.
     * @param value - The value to add.
     */
    add(key: string, value: unknown): Promise<void>;

    /**
     * Subtracts a value from the specified key.
     * @param key - The key for the value.
     * @param value - The value to subtract.
     */
    subtraction(key: string, value: unknown): Promise<void>;

    /**
     * Pushes a value to an array at the specified key.
     * @param key - The key for the value.
     * @param value - The value to push.
     */
    push(key: string, value: unknown): Promise<void>;

    /**
     * Pulls a value from an array at the specified key.
     * @param key - The key for the value.
     * @param value - The value to pull.
     */
    pull(key: string, value: unknown): Promise<void>;

    /**
     * Gets all keys in the database.
     * @returns An array of all keys.
     */
    allKeys(): Promise<string[]>;

    /**
     * Gets all values in the database.
     * @returns An array of all values.
     */
    allValues(): Promise<unknown[]>;

    /**
     * Gets the type of the value for the specified key.
     * @param key - The key for the value.
     * @returns The type of the value, or undefined if the key does not exist.
     */
    type(key: string): Promise<string | undefined>;

    /**
     * Resets the database.
     * @returns A promise that resolves when the reset is complete.
     */
    readonly reset: Promise<void>;

    /**
     * Backs up the database to the specified path.
     * @param path - The path to backup the database.
     */
    backup(path: string): Promise<void>;

    /**
     * Gets the number of entries in the database.
     * @returns The number of entries.
     */
    readonly length: Promise<number>;
  }
}