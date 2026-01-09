from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker , declarative_base
DataBase_Url = "mysql+pymysql://root:test1234@127.0.0.1:3306/UniversityCourse"
engine = create_engine(DataBase_Url)
sessionLocal = sessionmaker(autoflush=False, autocommit = False , bind = engine)
Base = declarative_base()
