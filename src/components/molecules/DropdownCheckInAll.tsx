import 'moment/locale/vi'; // Import ngôn ngữ tiếng Việt

import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { InputTimeField } from '@/components/molecules/InputTimeField';
import { DateTimeFormat } from '@/constants';
import { FromCheckInWorkerManyModel } from '@/modules/operate-worker/models';
import { formatDateTimeCustom } from '@/modules/operate-worker/utils';
import { CheckInsModel, WorkerModel } from '@/modules/worker/models';

moment.locale('vi');

interface Item {
  key: string;
  label: string;
}

interface DropdownProps {
  formMethods: UseFormReturn<FromCheckInWorkerManyModel, object>;
  readonly index: number;
  onSelect: (selectedItem?: Item) => void;
  readonly checkInList?: CheckInsModel[];
  readonly isHideEdit?: boolean;
  readonly workerCheckIn?: {
    record?: WorkerModel | undefined;
    title?: string | undefined;
  };
}

const DropdownCheckInAll: React.FC<DropdownProps> = ({
  onSelect,
  formMethods,
  isHideEdit,
  index,
  workerCheckIn,
}) => {
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

  const handleOnChange = (date: string | undefined) => {
    formMethods.setValue(
      `data.${index}.checkin_date`,
      formatDateTimeCustom(workerCheckIn?.title, date)
    );
  };

  const handleItemClick = (item?: Item) => {
    setSelectedItem(item || null);
    onSelect(item);

    formMethods.setValue(`data.${index}.checkin_type`, item?.key || '');
    if (item?.key !== 'CDL') {
      formMethods.setValue(
        `data.${index}.checkin_date`,
        formatDateTimeCustom(workerCheckIn?.title, moment('08:00', 'HH:mm').format('HH:mm'))
      );
    } else {
      formMethods.setValue(
        `data.${index}.checkin_date`,
        formatDateTimeCustom(workerCheckIn?.title, moment('08:00', 'HH:mm').format('HH:mm'))
      );
    }
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

  return (
    <Space>
      {selectedItem?.key === 'CDL' ? (
        <InputTimeField
          control={formMethods.control}
          disabled={isHideEdit}
          format={DateTimeFormat.time}
          formatValue={DateTimeFormat.time}
          name={`data.${index}.checkin_date`}
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

export { DropdownCheckInAll };
