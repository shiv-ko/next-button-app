import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button} from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input} from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }
  
  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', padding: 20, borderRadius: 8 }}>
          <button onClick={onClose}>Close</button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;