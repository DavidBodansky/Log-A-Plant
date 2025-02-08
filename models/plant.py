# Placeholder for a Plant model. In a real app, you might define SQLAlchemy models here.
class Plant:
    def __init__(self, plant_id, name, growth_stage="seed"):
        self.plant_id = plant_id
        self.name = name
        self.growth_stage = growth_stage

    def to_dict(self):
        return {
            "plant_id": self.plant_id,
            "name": self.name,
            "growth_stage": self.growth_stage
        }
