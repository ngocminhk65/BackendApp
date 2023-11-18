from faker import Faker
import random

fake = Faker()

for _ in range(20):
    id = random.randint(1, 1000)
    title = fake.sentence(nb_words=6)
    description = fake.text()
    image = fake.image_url()
    total_like = random.randint(0, 100)
    total_comment = random.randint(0, 100)
    review = random.randint(0, 5)
    is_delete = 0
    updated_at = fake.date_time_this_year()
    created_at = fake.past_date(start_date="-30d")
    deleted_at = "NULL"

    print(f"INSERT INTO `items` (`id`,`title`,`description`,`image`,`total_like`,`total_comment`,`review`,`is_delete`,`updated_at`,`created_at`,`deleted_at`) VALUES ({id},'{title}','{description}','{image}',{total_like},{total_comment},{review},{is_delete},'{updated_at}','{created_at}',{deleted_at});")