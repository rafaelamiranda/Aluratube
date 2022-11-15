import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://jwmkxgdeyrrvxabtibix.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3bWt4Z2RleXJydnhhYnRpYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0Njc3NTUsImV4cCI6MTk4NDA0Mzc1NX0.zmaIDUj0U-uexJnCRe2AsYKzEhZNaH27oVJfHaD85xQ";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
	return {
		getAllVideos() {
			return supabase.from("video")
				.select("*")
		}
	}
}