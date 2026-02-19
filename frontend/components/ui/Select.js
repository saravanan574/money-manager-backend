
'use client';
import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

const SelectContext = React.createContext(null);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a Select provider');
  }
  return context;
};

const Select = ({ children, value, onValueChange, defaultValue }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || value);
  const [displayValue, setDisplayValue] = React.useState('');
  
  const selectRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  React.useEffect(() => {
    if (defaultValue) {
        const child = React.Children.toArray(children).find(c => c.props.value === defaultValue);
        if (child) setDisplayValue(child.props.children);
    }
  }, [defaultValue, children]);

  const handleSelect = (val, label) => {
    setSelectedValue(val);
    setDisplayValue(label);
    onValueChange?.(val);
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, selectedValue, handleSelect }}>
      <div className="relative" ref={selectRef}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { setIsOpen, isOpen } = useSelectContext();
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = ({ placeholder }) => {
    const { selectedValue } = useSelectContext();
    const children = React.useContext(SelectContext)?.displayValue;
    if (!selectedValue && placeholder) {
        return <span className="text-muted-foreground">{placeholder}</span>
    }
    return <span>{children}</span>;
}

const SelectContent = ({ className, children, ...props }) => {
  const { isOpen } = useSelectContext();
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
        className
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  );
};

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  const { handleSelect } = useSelectContext();
  return (
    <div
      ref={ref}
      onClick={() => handleSelect(value, children)}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        'hover:bg-accent',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
