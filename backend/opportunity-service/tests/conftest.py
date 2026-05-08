import os
os.environ['OPPORTUNITY_DB_URL'] = 'sqlite:///./test_opportunity.db'

import sys
_current_file = os.path.abspath(__file__)
_backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(_current_file)))
_frontend_dir = os.path.dirname(_backend_dir)
_workspace_dir = os.path.dirname(_frontend_dir)
sys.path.insert(0, _backend_dir)
sys.path.insert(0, os.path.join(_backend_dir, "shared"))

import pytest
from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

engine = create_engine('sqlite://', connect_args={'check_same_thread': False}, poolclass=StaticPool)
TestingSession = sessionmaker(bind=engine)

metadata = MetaData()
users_table = Table('users', metadata,
    Column('id', Integer, primary_key=True, index=True),
    Column('email', String, unique=True, index=True, nullable=False),
    Column('password_hash', String, nullable=False),
    Column('full_name', String, nullable=False),
    Column('role', String, default="user"),
    Column('is_active', Integer, default=True)
)
metadata.create_all(bind=engine)