from faker import Faker
import random

fake = Faker()

for item_id in range(1, 10):
    for _ in range(4):
        id = random.randint(1, 1000)
        category_id = random.randint(1, 36)
        updated_at = fake.date_time_this_year()
        created_at = fake.past_date(start_date="-30d")
        deleted_at = "NULL"

        print(f"INSERT INTO `item_categorys` (`id`,`item_id`,`category_id`,`updated_at`,`created_at`,`deleted_at`) VALUES ({id},{item_id},{category_id},'{updated_at}','{created_at}',{deleted_at});")