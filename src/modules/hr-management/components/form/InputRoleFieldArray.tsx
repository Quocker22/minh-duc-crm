import 'antd/dist/antd.css';

import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import React, { useEffect, useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';

import { FormRoleModel, SimplifiedRecruitmentPlan } from '@/modules/hr-management/models';

interface IProps {
  readonly dataUpdate?: { id: string }[];
  readonly disableAll?: boolean;
  readonly formMethods?: UseFormReturn<FormRoleModel>;
  isChangeValue?: () => void;
  readonly plainOptions?: SimplifiedRecruitmentPlan[];
  readonly selectAll?: boolean;
}

const InputRoleFieldArray: React.FC<IProps> = ({
  plainOptions,
  formMethods,
  dataUpdate,
  selectAll,
  disableAll,
  isChangeValue,
}) => {
  const [checkedList, setCheckedList] = useState<{ id: string }[]>([]);

  const { replace } = useFieldArray({
    control: formMethods?.control,
    name: 'permissions',
  });

  useEffect(() => {
    replace(checkedList);
  }, [checkedList, replace]);

  useEffect(() => {
    setCheckedList(dataUpdate || []);
  }, [dataUpdate]);

  useEffect(() => {
    if (selectAll !== undefined && plainOptions) {
      const newCheckedList = selectAll
        ? plainOptions.flatMap((parentOption) =>
            parentOption.permissions.map((permission) => ({ id: permission.value }))
          )
        : [];
      setCheckedList(newCheckedList);
    }
  }, [selectAll, plainOptions]);
  const onParentChange = (parentValue: string, checked: boolean) => {
    isChangeValue?.();

    const currentOption = plainOptions?.find((option) => option.value === parentValue);
    if (!currentOption) return;

    let newCheckedList: { id: string }[];
    if (checked) {
      // Thêm tất cả permissions vào checkedList
      const newCheckedItems = currentOption.permissions.map((p) => ({ id: p.value }));
      newCheckedList = [...checkedList, ...newCheckedItems];
    } else {
      // Loại bỏ tất cả permissions của parent khỏi checkedList
      newCheckedList = checkedList.filter(
        (item) => !currentOption.permissions.some((p) => p.value === item.id)
      );
    }

    // Loại bỏ các phần tử trùng lặp dựa trên id
    newCheckedList = newCheckedList.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    setCheckedList(newCheckedList);
  };

  const onChildChange = (checkedValues: CheckboxValueType[], parentValue: string) => {
    // Lấy tất cả các permissions của parent hiện tại
    isChangeValue?.();
    const parentPermissions =
      plainOptions
        ?.find((option) => option.value === parentValue)
        ?.permissions.map((p) => p.value) || [];

    // Lọc ra tất cả các entries không thuộc parent hiện tại để giữ lại
    let updatedCheckedList = checkedList.filter((item) => !parentPermissions.includes(item.id));

    // Thêm các giá trị được chọn từ event hiện tại
    const newCheckedItems = checkedValues.map((value) => ({ id: String(value) }));
    updatedCheckedList = [...updatedCheckedList, ...newCheckedItems];

    setCheckedList(updatedCheckedList);
  };

  return (
    <div>
      {plainOptions?.map((parentOption) => {
        // Kiểm tra xem tất cả permissions đã được chọn hay không
        const isAllChildrenChecked = parentOption.permissions.every((p) =>
          checkedList.some((item) => item.id === p.value)
        );

        // Kiểm tra xem có bất kỳ permission nào được chọn
        const isSomeChildrenChecked = parentOption.permissions.some((p) =>
          checkedList.some((item) => item.id === p.value)
        );

        // Lấy ra các giá trị đã được chọn cho group này
        const checkedValuesForGroup = checkedList
          .filter((item) => parentOption.permissions.some((p) => p.value === item.id))
          .map((item) => item.id);

        return (
          <div key={parentOption.value}>
            <Checkbox
              checked={isAllChildrenChecked}
              disabled={disableAll}
              indeterminate={!isAllChildrenChecked && isSomeChildrenChecked}
              onChange={(e) => onParentChange(parentOption.value, e.target.checked)}
              value={parentOption.value}
            >
              {parentOption.label}
            </Checkbox>
            <Checkbox.Group
              className="d-flex flex-column ms-10"
              disabled={disableAll}
              onChange={(checkedValues) => onChildChange(checkedValues, parentOption.value)}
              options={parentOption.permissions}
              value={checkedValuesForGroup}
            />
          </div>
        );
      })}
    </div>
  );
};

export { InputRoleFieldArray };
