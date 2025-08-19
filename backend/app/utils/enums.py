import enum


class TaskStatusEnum(int, enum.Enum):
    NOT_DONE = 1
    IN_PROGRESS = 2
    DONE = 3
