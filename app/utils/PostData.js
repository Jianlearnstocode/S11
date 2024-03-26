export const postData = async (newTodo) => {
    try {
      const res = await fetch("https://assessment-server-r6hy.onrender.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTodo,
          completed: false,
          user_email: "bob@test.com",
          date: Date.now(),
        }),
      });
      setTodos([...todos, { id: Date.now(), title: newTodo, completed: false }]);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };