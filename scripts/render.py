import os
import tomllib
from string import Template

from slugify import slugify

cfg = tomllib.load(open("config.toml", "rb"))

for template in os.scandir("data\\templates"):
    with open(f"test_{template.name}", "w") as f:
        f.write(
            Template(open(template.path).read()).substitute(
                {
                    "domain": cfg["ctf"]["domain_name"],
                    "ctf_name": slugify(cfg["ctf"]["name"], separator="_"),
                    "database_username": cfg["database"]["username"],
                    "database_password": cfg["database"]["password"],
                    "api_server_host": cfg["services"]["api_server_host"],
                    "redis_port": cfg["redis"]["port"],
                    "redis_username": cfg["redis"]["username"],
                    "redis_password": cfg["redis"]["password"],
                }
            )
        )
