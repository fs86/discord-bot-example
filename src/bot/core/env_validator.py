import os
from pathlib import Path


class MissingEnvException(Exception):
    def __init__(self, *args):
        self.message = args[0] if args else None

    def __str__(self):
        return (
            f"MissingEnvException, {self.message}"
            if self.message
            else "MissingEnvException has been raised."
        )


def __create_empty_env_var(env_var: dict[str, bool], file_name: str):
    project_root_path = Path(__file__).parent.parent
    env_file_path = str(project_root_path.joinpath(file_name))

    lines = []

    with open(env_file_path, "r+") as env_file:
        lines = env_file.readlines()

    key_exists = next(filter(lambda line: f"{env_var['name']}=" in line, lines), None) is not None

    if not key_exists:
        last_line = lines[len(lines) - 1] if len(lines) > 0 else None
        new_line_char = "" if last_line is None or last_line.endswith("\n") else "\n"
        lines.append(f"{new_line_char}{env_var['name']}=\n")

        with open(env_file_path, "w+") as env_file:
            env_file.write("".join(lines))


def ensure_vars_exist(env_vars: list[dict[str, bool]]):
    missing_env_vars = []
    for env_var in env_vars:
        if not "name" in env_var:
            raise "Key 'name' not found."

        required = True

        if "when" in env_var:
            if not isinstance(env_var["when"], bool):
                raise "Value of 'when' must be a bool."

            required = env_var["when"]

        if required:
            value = os.getenv(env_var["name"])
            if not value:
                missing_env_vars.append(env_var["name"])
                __create_empty_env_var(env_var, ".env")

    if len(missing_env_vars) > 0:
        plural_suffix = "s" if len(missing_env_vars) > 1 else ""
        message = (
            f"Missing required environment variable{plural_suffix}: {', '.join(missing_env_vars)}"
        )
        raise MissingEnvException(message)
