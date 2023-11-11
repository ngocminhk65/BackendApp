import re

def increase_chap_id(sql):
    match = re.search(r'\((\d+),', sql)
    if match:
        old_chap_id = int(match.group(1))
        new_chap_id = old_chap_id + 64
        sql = sql.replace(f'({old_chap_id},', f'({new_chap_id},')
    return sql

# Replace 'input.sql' and 'output.sql' with the actual paths to your input and output SQL files
with open('item_chap_images.sql', 'r') as infile, open('output.sql', 'w') as outfile:
    for line in infile:
        modified_line = increase_chap_id(line)
        outfile.write(modified_line)