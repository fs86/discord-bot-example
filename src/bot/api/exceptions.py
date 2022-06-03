class InvalidPermissions(Exception):
    """An Exception raised when the user has not the correct permissions to access the resource."""


class RequiresGuildOwner(Exception):
    """An Exception raised when the user is not an guild owner."""
