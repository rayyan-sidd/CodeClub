//usage:
// node scripts/upload-event-media.js <event-uuid> ./path/to/local/photos-folder

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: "./src/scripts/.env" });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const [, , eventId, folderPath] = process.argv;

if (!eventId || !folderPath) {
  console.error(
    "Usage: node scripts/upload-event-media.js <event_id> <folder_path>",
  );
  process.exit(1);
}

async function run() {
  const files = fs
    .readdirSync(folderPath)
    .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f));

  console.log(`Found ${files.length} images. Uploading...`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(folderPath, file);
    const fileBuffer = fs.readFileSync(filePath);
    const storageKey = `${eventId}-${Date.now()}-${file}`;

    const { error: uploadError } = await supabase.storage
      .from("event-media")
      .upload(storageKey, fileBuffer, {
        contentType: `image/${path.extname(file).slice(1)}`,
      });

    if (uploadError) {
      console.error(`Failed to upload ${file}:`, uploadError.message);
      continue;
    }

    const { data: urlData } = supabase.storage
      .from("event-media")
      .getPublicUrl(storageKey);

    const { error: insertError } = await supabase.from("event_media").insert({
      event_id: eventId,
      image_url: urlData.publicUrl,
      sort_order: i + 1,
    });

    if (insertError)
      console.error(`Failed to insert row for ${file}:`, insertError.message);
    else console.log(`✓ ${file}`);
  }

  console.log("Done.");
}

run();
