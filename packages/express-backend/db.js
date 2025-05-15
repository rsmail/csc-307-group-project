/* 
Import {supabase} object (use any name) to access the database
*/

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config()

const SUPABASE_URI = process.env.SUPABASE_URI;
const ANON_KEY = process.env.ANON_KEY;

const supabase = createClient(SUPABASE_URI, ANON_KEY);

export default Object.freeze(supabase)