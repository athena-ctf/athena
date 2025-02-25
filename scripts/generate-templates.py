import json

import slugify
from jinja2 import Environment, FileSystemLoader, select_autoescape

config = json.load(open("conf/config.json"))
env = Environment(
    loader=FileSystemLoader("data/templates"), autoescape=select_autoescape
)
env.filters["slugify"] = lambda s: slugify.slugify(s, separator="_")

templates = ["Caddyfile", "compose.yml", "redis.conf"]

for template_file in templates:
    template = env.get_template(template_file)
    with open(template_file, "w") as f:
        f.write(template.render(config))
