"use client";

import { useState, useContext, useRef } from "react";
import { financeContext } from "@/lib/store/finance-context";

import { v4 as uuidv4 } from "uuid";

import Modal from "@/components/Modal";

import { toast } from "react-toastify";

function AddExpensesModal({ show, onClose }) {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const { expenses, addExpenseItem, addCategory } = useContext(financeContext);

  const titleRef = useRef();
  const colorRef = useRef();

  const addExpenseItemHandler = async () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    try {
      await addExpenseItem(selectedCategory, newExpense);

      console.log(newExpense);
      setExpenseAmount("");
      setSelectedCategory(null);
      onClose();
      toast.success("Expense Item Added!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const addCategoryHandler = async () => {
    const title = titleRef.current.value;
    const color = colorRef.current.value;

    try {
      await addCategory({ title, color, total: 0 });
      setShowAddExpense(false);
      toast.success("Category created!");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label>Enter an amount..</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter expense amount"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
        />
      </div>

      {/* Expense Categories */}
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl capitalize">Select expense category</h3>
            <button
              onClick={() => {
                setShowAddExpense(true);
              }}
              className="text-lime-400"
            >
              + New Category
            </button>
          </div>

          {showAddExpense && (
            <div className="flex items-center justify-between">
              <input type="text" placeholder="Enter Title" ref={titleRef} />

              <label>Pick Color</label>
              <input type="color" className="w-24 h-10" ref={colorRef} />
              <button
                onClick={addCategoryHandler}
                className="btn btn-primary-outline"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowAddExpense(false);
                }}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </div>
          )}

          {expenses.map((expense) => {
            return (
              <button
                key={expense.id}
                onClick={() => {
                  setSelectedCategory(expense.id);
                }}
              >
                <div
                  style={{
                    boxShadow:
                      expense.id === selectedCategory ? "1px 1px 4px" : "none",
                  }}
                  className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
                >
                  <div className="flex items-center gap-2">
                    {/* Colored circle */}
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{
                        backgroundColor: expense.color,
                      }}
                    />
                    <h4 className="capitalize">{expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button className="btn btn-primary" onClick={addExpenseItemHandler}>
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
}

export default AddExpensesModal;
