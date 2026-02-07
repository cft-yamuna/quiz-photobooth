import random
import string
from supabase import create_client

SUPABASE_URL = "https://ozkbnimjuhaweigscdby.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96a2JuaW1qdWhhd2VpZ3NjZGJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyODc4NDYsImV4cCI6MjA2Njg2Mzg0Nn0.C4OgN-JEBX9ZqnRDXU9XmGnED2pCh3kI82GrHPXtq8U"


def generate_code(length=6):
    """Generate a random alphanumeric code like 'NK7X2A'."""
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=length))


def seed_codes(city, count):
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

    rows = []
    codes_set = set()

    for _ in range(count):
        code = generate_code()
        while code in codes_set:
            code = generate_code()
        codes_set.add(code)

        rows.append({
            "code": code,
            "city": city,
        })

    result = supabase.table("Nike_photobooth").insert(rows).execute()

    print(f"\nInserted {len(result.data)} rows for city '{city}':")
    for row in result.data:
        print(f"  ID: {row['id']}  |  Code: {row['code']}  |  City: {row['city']}")


if __name__ == "__main__":
    city = input("Enter city name: ").strip()
    if not city:
        print("City name cannot be empty.")
        exit(1)

    count_input = input("Enter number of codes to generate: ").strip()
    try:
        count = int(count_input)
        if count <= 0:
            raise ValueError
    except ValueError:
        print("Please enter a valid positive number.")
        exit(1)

    seed_codes(city, count)
