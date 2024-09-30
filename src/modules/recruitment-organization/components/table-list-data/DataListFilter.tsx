import { FC, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/molecules/Button';
import { Drawer } from '@/components/molecules/Drawer';
import { FormField } from '@/components/molecules/FormField';
import { InputField } from '@/components/molecules/InputField';

type Props = {
  initFiltersValues?: { name: string };
  onFiltersConfirm?: (formData: Partial<{ name: string }>) => void;
};

const DataListFilter: FC<Props> = (props: Props) => {
  const defaultValues = useMemo<{ name: string }>(() => {
    return {
      name: '',
      phone_number: '',
      ...props.initFiltersValues,
    };
  }, []);

  const formMethods = useForm<{ name: string }>({ defaultValues });

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const onSubmit: SubmitHandler<{ name: string }> = (formData) => {
    props.onFiltersConfirm?.(formData);
    closeDrawer();
  };

  function openDrawer() {
    setIsOpenDrawer(true);
  }

  function closeDrawer() {
    setIsOpenDrawer(false);
  }

  return (
    <>
      <Button
        className="ms-5 btn btn-outline btn-outline-dark btn-active-light-dark"
        onClick={openDrawer}
      >
        <i className="fa-solid fa-filter" />
      </Button>
      <Drawer isOpen={isOpenDrawer} onClose={closeDrawer} title={'Bộ lọc đơn hàng'} keyboard>
        <FormField
          className="form position-relative h-100 w-100"
          methods={formMethods}
          onSubmit={onSubmit}
        >
          <InputField
            control={formMethods.control}
            groupClass="mb-10 fv-row"
            label={<b>Nhập tên</b>}
            name="name"
          />

          <div className="text-center">
            <Button
              className="my-5 position-absolute bottom-0 end-0 w-100"
              data-testid="button-login"
              type="submit"
              variant="primary"
            >
              {'Áp dụng'}
            </Button>
          </div>
        </FormField>
      </Drawer>
    </>
  );
};

export { DataListFilter };
