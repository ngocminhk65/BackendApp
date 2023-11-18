from faker import Faker
import random

fake = Faker()

for item_id in range(1, 10):
    id = random.randint(1, 1000)
    name = fake.name()
    image = fake.image_url()
    created_at = fake.date_time_this_year()
    updated_at = fake.date_time_this_year()
    deleted_at = "NULL"

    print(f"INSERT INTO `authors` (`id`,`name`,`item_id`,`image`,`created_at`,`updated_at`,`deleted_at`) VALUES ({id},'{name}',{item_id},'{image}','{created_at}','{updated_at}',{deleted_at});")