import style from "./comments.module.css";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import edit from "../../../icons/edit.svg";
import { SingleComment } from "./single-comment";
import { selectUserId, selectUserRole } from "../../../selectors";
import { closeModal, openModal } from "../../../slices/appSlice";
import { ROLE } from "../../../constants";
import {
  getComments,
} from "../../../fetchs";
import axios from "axios";

export const Comments = () => {
  const users = useSelector((state) => state.allUsers.items);
  const [newComment, setNewComment] = useState(null);
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectUserRole);
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [author, setAuthor] = useState(null);
  const productId = useParams();
  const ref = useRef(null);

  const isGuest = userRole === ROLE.GUEST;
  const onCommentRemove = (id) => {
    dispatch(
      openModal({
        text: "Удалить комментрарий?",
        onConform: () => {
          axios.delete(`/comments/${id}`);
          setComments(comments.filter((comment) => comment._id !== id));
          dispatch(closeModal());
        },
        onCancel: () => dispatch(closeModal()),
      })
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onNewCommentAdded = (author, userId, productId, content) => {
    if (!content || content.trim() === "") {
      setErrorMessage("Комментарий не может быть пустым");
      return;
    }
    axios.post("/comments",{ author, userId, productId, content }).then((res) => res.data
    ).then(
      (productData) => {
        setComments([...comments, productData]);
      }
    );
    ref.current.value = null;
    setNewComment(null);
  };

  useEffect(() => {
      const user = users?.find((user) => user.id === userId);
      setAuthor(user?.login);
    getComments(productId.id).then((comments) => setComments(comments));
  }, [productId.id, setComments, userId, users]);

  return (
    <>
      <div className={style.commentsWrapper}>
          <div className={style.commentTitle}>Комментарии</div>
        <div className={style.comments}>
          {comments?.map(({ _id, author, productId, content }) => (
            <SingleComment
              key={_id}
              productId={productId}
              id={_id}
              author={author}
              content={content}
              onCommentRemove={onCommentRemove}
            />
          ))}
        </div>
        {!isGuest && (
          <>
            <div className={style.errorMessage}>{errorMessage}</div>
            <div className={style.inputWrapper}>
              <textarea
                className={style.Textaria}
                ref={ref}
                name="comment"
                value={newComment}
                placeholder="Ваш комментарий..."
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
              />

              <div
                className={style.EditIconWrapper}
                onClick={() =>
                  onNewCommentAdded(author, userId, productId.id, newComment)
                }
              >
                <img src={edit} alt="edit" className={style.EditIcon} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
