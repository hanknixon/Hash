import configparser
import os

class Config:
    def __init__(self, config_path=None):
        # Automatically detect the absolute path of config.ini
        if config_path is None:
            self.config_path = os.path.join(os.path.dirname(__file__), "../config.ini")
        else:
            self.config_path = config_path

        self.config = self.load_config()

    def load_config(self):
        if not os.path.exists(self.config_path):
            raise FileNotFoundError(f"Config file not found at {self.config_path}")

        config = configparser.ConfigParser()
        config.read(self.config_path, encoding="utf-8")

        print(f"Loaded config.ini from: {self.config_path}")  # Debugging
        print("Config Sections:", config.sections())  # Debugging

        if "API_CONFIG" not in config:
            raise KeyError("API_CONFIG section is missing in config.ini!")

        return config
