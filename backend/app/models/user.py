from typing import List

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class User(Base):
    name: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True, nullable=False)
    password_hash: Mapped[str]

    projects: Mapped[List["Project"]] = relationship(
        "Project", back_populates="owner", cascade="all, delete-orphan"
    )

    tasks: Mapped[List["Task"]] = relationship(
        "Task", back_populates="assignee", cascade="all, delete-orphan"
    )


