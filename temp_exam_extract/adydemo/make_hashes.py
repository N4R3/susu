import bcrypt

def hash_line(text: str):
    text = text.encode("utf-8")
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(text, salt)
    return hashed.decode()

# ide írd az adatokat (normalizált formában!)
values = [
    "ab123",
    "test999",
    "teszt",
    "random"
]

with open("db.txt", "w", encoding="utf-8") as f:
    for v in values:
        h = hash_line(v)
        f.write(h + "\n")

print("db.txt kész (bcrypt hash-ekkel)")