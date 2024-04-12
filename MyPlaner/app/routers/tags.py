from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from .. import schemas, database, models,  utils, oauth2
from ..database import get_db

router = APIRouter(
    tags=['Tags'],
    prefix="/tags"
)

""" GET TAGS """

@router.get('/', response_model=List[schemas.Tag])
def get_tags(db: Session = Depends(get_db)):
    tags = db.query(models.Tag).all()
    return tags

"""      ADDING A TAG FOR TASK.         """

@router.post('/{task_id}', status_code=status.HTTP_201_CREATED, response_model=schemas.Task)
def add_tag(task_id: int, tag_id: schemas.TagAppend, db: Session = Depends(get_db),
            current_user: int = Depends(oauth2.get_current_user)):
    
    task = db.query(models.Tasks).filter(models.Tasks.id == task_id).first()

    if task.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, 
                            detail=f"Not authorized to perform request action")

    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"task with id: {task_id} does not exist")
    
    task.tags = tag_id.id
    db.commit()
        
    return task