"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import jaLocale from "@fullcalendar/core/locales/ja";
//import {EventDisplay} from '@/EventDisplay';
import Burger from '../hamburger/Burger';
import { startOfDay, subDays } from 'date-fns'; // date-fns ライブラリを利用

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  description: string;
  id: number;
}

interface Schedule {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  description: string;
  id: number;
}

export default function EventCalendar() {
  const [events, setEvents] = useState([
    { title: 'event 1', id: '1' },
    { title: 'event 2', id: '2' },
    
  ])
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)

  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    start: '',
    allDay: false,
    id: 0,
    description: ''
  })
  //draggableなeventを設定、ここで設定したものがカレンダーに表示される。
  useEffect(() => {
    let draggableEl = document.getElementById('draggable-el')
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title")
          let id = eventEl.getAttribute("data")
          let start = eventEl.getAttribute("start")
          return { title, id, start }
        }
      })
    }
  }, [])


  useEffect(() => {
    const yesterday = subDays(new Date(), 1); // 昨日の日付を取得
    const startOfToday = startOfDay(new Date()); // 今日の始まり

    // 昨日までの日付にDoneを追加
    let tempEvents: Event[] = [];
    for (let d = new Date(yesterday); d <= startOfToday; d.setDate(d.getDate() + 1)) {
        tempEvents.push({
            title: 'Done',
            start: new Date(d),
            allDay: true,
            description: '',
            id: 0
        });
    }

    // イベントリストに追加
    setAllEvents(prevEvents => [...prevEvents, ...tempEvents]);
  }, []);
  //month表示から日をクリックしたときの処理
  //新しいeventを作成して、現在時刻のタイムスタンプをidに設定している。
  function handleDateClick(arg: { date: Date, allDay: boolean }) {
    setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime() })
    setShowModal(true)
  }
  //ドロップしたときの処理追加している。
  function addEvent(data: DropArg) {
    const event = { ...newEvent, start: data.date.toISOString(), title: data.draggedEl.innerText, allDay: data.allDay, id: new Date().getTime() }
    setAllEvents([...allEvents, event])
  }
  //削除モーダルを表示する処理（idを与えて、どのイベントを消すかを指定する）
  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true)
    setIdToDelete(Number(data.event.id))
  }
  //削除確認modalで削除を選択したときの削除&modalを閉じる処理
  function handleDelete() {
    setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
    setShowDeleteModal(false)
    setIdToDelete(null)
  }
  //modalwindowを閉じる処理
  //setNewEventでフォームをリセットすることで、過去の情報を残さない。
  function handleCloseModal() {
    setShowModal(false)
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0,
      description: ''
    })
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewEvent({
      ...newEvent,
      title: e.target.value
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAllEvents([...allEvents, newEvent])
    setShowModal(false)
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0,
      description: ''
    })
  }


  function handleEventClick(data:Event) {
    const { id, title, start, allDay, description } = data;
    setNewEvent({ title, start, allDay, id: Number(id), description });
    setShowModal(true);
  }
  //edit event
  function handleEdit( e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAllEvents(allEvents.map(event => {
      if (event.id === newEvent.id) {
        return { ...event, title: newEvent.title };
      }
      return event;
    }));
    handleCloseModal();
  }
  
  
  return (
    <>
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
              locales={[jaLocale]}
              locale={jaLocale} 
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin
              ]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'resourceTimelineWook, dayGridMonth,timeGridWeek'
              }}
              events={allEvents as EventSourceInput}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              //
              selectMirror={true}
              //月表示でどのようにするかはここで設定する？
              dateClick={handleDateClick}
              //dataの中身は初期化された配列。そこをドロップできるようにしてる。
              drop={(data) => addEvent(data)}
              //ここで削除以外のイベントも設定できると思う。
              eventClick={(data) => handleDeleteModal(data)}
              
            />
          </div>
          <div id="draggable-el" className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50">
            <h1 className="font-bold text-lg text-center">Drag Event</h1>
            {/* draggableなevent配列を表示 */}
            {events.map(event => (
              <div
                className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
                title={event.title}
                key={event.id}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
        {/*イベントの削除,編集を確認するためのModal*/}
        <Transition.Root show={showDeleteModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          Edit Event Name
                        </Dialog.Title>
                        <form onSubmit={handleEdit} >
                          <input type="text" name="title" value={newEvent.title} onChange={(e) => handleChange(e)} className="block w-full mt-1 mb-2 p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Event Title" />
                          <div className="flex justify-between">
                            <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500" onClick={handleDelete}>
                              Delete
                            </button>
                            <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500" >
                              Save
                            </button>
                            <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500" onClick={handleCloseModal}>
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>


                </Transition.Child>
              </div>
            </div>
          </Dialog>
        { /* ここで、クリックしたらmodalを開いて、そのあとにmodalを閉じるとかを管理している。*/}
        { /* transitionはheadless uiのやつ。*/}
        </Transition.Root>
        <Transition.Root show={showModal} as={Fragment}>
          
          <Dialog as="div" className="relative z-10" onClose={setShowModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Add Event
                        </Dialog.Title>
                        {/*ここで追加を管理 */}
                        <form action="submit" onSubmit={handleSubmit}>
                          <div className="mt-2">
                            <input type="text" name="title"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 
                            focus:ring-inset focus:ring-violet-600 
                            sm:text-sm sm:leading-6"
                              value={newEvent.title} onChange={(e) => handleChange(e)} placeholder="Title" />

                            <div>
                                {/*
                                <input
                                    type="text"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleChange}
                                    placeholder="Title"
                                    style={styles.input}
                                />
                                <input
                                    type="date"
                                    name="startDate"
                                    value={newEvent.startDate}
                                    onChange={handleChange}
                                    style={styles.input}
                                />
                                <input
                                    type="time"
                                    name="startTime"
                                    value={newEvent.startTime}
                                    onChange={handleChange}
                                      style={styles.input}
                                  />
                                <input
                                      type="date"
                                      name="endDate"
                                      value={newEvent.endDate}
                                      onChange={handleChange}
                                      style={styles.input}
                                />
                                <input
                                      type="time"
                                      name="endTime"
                                      value={newEvent.endTime}
                                      onChange={handleChange}
                                      style={styles.input}
                                />

                                  */}
                                <input
                                    type="text"
                                    name="description"
                                    value={newEvent.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                    focus:ring-2 
                                    focus:ring-inset focus:ring-violet-600 
                                    sm:text-sm sm:leading-6"
                                />
                            </div>
                          </div>


                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <button
                              type="submit"
                              className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                              disabled={newEvent.title === ''}
                            >
                              Create
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                              onClick={handleCloseModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main >
    </>
  )
}

const styles = {
  container: {
      display: 'flex',
      flexDirection: 'column' as const,
      width: '100%',
      padding: '10px',
      
  },
  header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      padding: '10px'
  },
  formGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center'
  },
  input: {
      width: '90%',
      padding: '10px',
      margin: '5px',
      border: 'none',
      borderRadius: '5px'
  },
  button: {
      color: 'white',
      backgroundColor: 'transparent',
      border: 'none'
  }
};