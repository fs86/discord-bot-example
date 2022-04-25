import yaml
from munch import munchify

from core.singleton import Singleton


class Config(metaclass=Singleton):
    def __init__(self):
        with open("config.yml", "r") as stream:
            self.__config = munchify(yaml.safe_load(stream))

        for key in self.__config:
            setattr(Config, key, self.__config[key])
