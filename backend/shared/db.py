from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator
import os

Base = declarative_base()

_engines = {}
_sessions = {}


def get_engine(db_url: str):
    if db_url not in _engines:
        _engines[db_url] = create_engine(db_url, pool_pre_ping=True)
    return _engines[db_url]


def get_db(db_url: str) -> Generator[Session, None, None]:
    engine = get_engine(db_url)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables(db_url: str) -> None:
    engine = get_engine(db_url)
    Base.metadata.create_all(bind=engine)


def get_db_from_env():
    def dependency():
        db_url = os.getenv("AUTH_DB_URL") or os.getenv("OPPORTUNITY_DB_URL")
        if not db_url:
            raise RuntimeError("Database URL not configured")
        gen = get_db(db_url)
        return next(gen)
    return dependency