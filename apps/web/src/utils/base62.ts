const BASE62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function uuidToBase62(uuid: string): string {
  const cleanUuid = uuid.replace(/-/g, "").toLowerCase();

  let num = BigInt(`0x${cleanUuid}`);
  if (num < 0n) {
    throw new Error("Input must be a non-negative integer");
  }

  if (num === 0n) {
    return BASE62_CHARS[0];
  }

  const digits: string[] = [];

  while (num > 0n) {
    digits.unshift(BASE62_CHARS[Number(num % 62n)]);
    num = num / 62n;
  }

  return digits.join("");
}
