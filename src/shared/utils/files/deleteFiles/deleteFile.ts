import fs from "fs";

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename);
  } catch (err) {
    return console.log(err);
  }

  await fs.promises.unlink(filename);
};
