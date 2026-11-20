"""Set the shared primary navigation order while preserving each page's links."""

from pathlib import Path
import re
import sys


ORDER = ("Products", "Pricing", "About Us", "Contact Us", "Blogs")
LABELS = {"About": "About Us", "Contact": "Contact Us", "Blog": "Blogs"}
HEADER_NAV = re.compile(
    r"(<header\b(?:(?!</header>).)*?<nav\b[^>]*>)(.*?)(</nav>)", re.S
)
PRIMARY_LINK = re.compile(
    r"(<a\b[^>]*>)(Products|Pricing|About(?: Us)?|Contact(?: Us)?|Blogs?)(</a>)"
)
PLAIN_LINKS = re.compile(
    r"((?:<a\b[^>]*>(?:Pricing|About Us|Contact Us|Blogs)</a>\s*)+)$"
)


def order_navigation(match):
    opening, content, closing = match.groups()
    if content.startswith('<div class="relative">'):
        # The legacy header wraps each link in its own navigation item.
        items = re.split(r'(?=<div class="relative">)', content)[1:]
    else:
        # Keep the Products dropdown intact and reorder its sibling links.
        links = PLAIN_LINKS.search(content)
        if not links:
            return match[0]
        items = [content[:links.start()], *re.findall(r"<a\b[^>]*>[^<]+</a>\s*", links[0])]

    by_label = {}
    for item in items:
        link = PRIMARY_LINK.search(item)
        if not link:
            return match[0]
        label = LABELS.get(link[2], link[2])
        by_label[label] = item[:link.start(2)] + label + item[link.end(2):]
    if len(items) != len(ORDER) or by_label.keys() != set(ORDER):
        return match[0]
    return opening + "".join(by_label[label] for label in ORDER) + closing


if __name__ == "__main__":
    for page in Path(sys.argv[1]).rglob("*.html"):
        original = page.read_bytes()
        source = original.decode("utf-8")
        updated = HEADER_NAV.sub(order_navigation, source, count=1)
        if updated != source:
            page.write_bytes(updated.encode("utf-8"))
