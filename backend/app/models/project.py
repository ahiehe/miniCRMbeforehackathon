from typing import List

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class Project(Base):
    title: Mapped[str]
    description: Mapped[str]

    owner_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    owner: Mapped["User"] = relationship("User", back_populates="projects")

    tasks: Mapped[List["Task"]] = relationship("Task", back_populates="project")


