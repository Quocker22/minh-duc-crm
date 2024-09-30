import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { InputTimeField } from '@/components/molecules/InputTimeField';
import { DateTimeFormat } from '@/constants';
import { FromCheckInWorkerModel } from '@/modules/operate-worker/models';

interface Item {
  key: string;
  label: string;
}

interface DropdownProps {
  formMethods: UseFormReturn<FromCheckInWorkerModel, object>;
  onSelect: (selectedItem: Item) => void;
  readonly current?: string;
  readonly isHideEdit?: boolean;
}

const DropdownCheckIn: React.FC<DropdownProps> = ({ onSelect, formMethods, isHideEdit }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    onSelect({ key: '', label: '' });

    return;
  }, []);

  const items: Item[] = [
    {
      key: 'CDL',
      label: 'Có đi làm',
    },
    {
      key: 'NP',
      label: 'Nghỉ phép',
    },
    {
      key: 'NKP',
      label: 'Nghỉ không phép',
    },
  ];

  useEffect(() => {
    formMethods.setValue(`checkin_date`, '08:00');
    items.map((i) => {
      if (i.key === formMethods.watch('checkin_type')) {
        setSelectedItem(i);
        onSelect(i);
      }
    });
  }, [formMethods.watch('checkin_type')]);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    onSelect(item);
    formMethods.setValue('checkin_type', item.key);
  };

  const menu = (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item?.key} onClick={() => handleItemClick(item)}>
          {item?.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleOnChange = (date: string | undefined) => {
    formMethods.setValue(`checkin_date`, date || '');
  };

  return (
    <Space>
      {selectedItem?.key === 'CDL' ? (
        <InputTimeField
          control={formMethods.control}
          disabled={isHideEdit}
          format={DateTimeFormat.time}
          formatValue={DateTimeFormat.time}
          name="checkin_date"
          onChange={handleOnChange}
          size="small"
          isHideRoundedPill
        />
      ) : (
        <span className="me-2">{selectedItem?.key}</span>
      )}
      {!isHideEdit && (
        <Dropdown overlay={menu} trigger={['click']}>
          <CaretDownOutlined className="p-3 cursor-pointer" rev={'CaretDownOutlined'} />
        </Dropdown>
      )}
    </Space>
  );
};

export { DropdownCheckIn };
