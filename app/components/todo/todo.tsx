import React from 'react'
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import Modal from "./a";
let nextId = 0;

interface ListItem{
    id:number;
    content:string;
}

function List(){
    const [inputValue, setInputValue] = useState<string>('');
    const [items, setItems] = useState<ListItem[]>([]);

    // リストアイテムを追加する関数
    const handleAddItem = () => {
        if (inputValue.trim() === '') {
        return; // 空の入力を無視
        }
        const newItem: ListItem = {
        id: Date.now(), // 一意のIDとして現在のタイムスタンプを使用
        content: inputValue
        };
        setItems([...items, newItem]);
        setInputValue(''); // 入力フィールドをクリア
    };

    // リストアイテムを削除する関数
    const handleRemoveItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };
    return (
        <>
          <h1>Inspiring sculptors:</h1>
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button onClick={() => {
            setItems([
              ...items,


            ]);
          }}>Add</button>
          <ul>
            <Checkbox></Checkbox>
            {items.map(artist => (
              <li key={artist.id}>{artist.content}</li>
            ))}
          </ul>
        </>
      );
}

const TodoCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  
};

export default TodoCalendar;