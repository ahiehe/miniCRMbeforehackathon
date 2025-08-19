from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base
from ..utils.enums import TaskStatusEnum


class Task(Base):
    title: Mapped[str]
    description: Mapped[str]
    status: Mapped[TaskStatusEnum] = mapped_column(default=TaskStatusEnum.NOT_DONE)

    project_id: Mapped[int] = mapped_column(ForeignKey("projects.id"))
    project: Mapped["Project"] = relationship("Project", back_populates="tasks")

    assignee_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    assignee: Mapped["User"] = relationship("User", back_populates="tasks")



