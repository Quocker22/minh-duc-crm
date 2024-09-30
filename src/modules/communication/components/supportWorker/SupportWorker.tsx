/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import defaultAvatar from '@/assets/images/defaultAvatar.png';
import { Avatar, Badge, Spin } from 'antd';
import { Button } from '@/components/molecules/Button';
import { InputField } from '@/components/molecules/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SupportMessage, SupportModel } from '@/modules/communication/models';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetSupportFilter } from '@/modules/communication/hooks/useGetSupportFilter';
import { useGetMessageFilter } from '@/modules/communication/hooks/useGetMessageFilter';
import { yupResolver } from '@hookform/resolvers/yup';
import { getMessageFormSchema } from '@/modules/communication/services/validation';
import { FormField } from '@/components/molecules/FormField';
import { useSendMessage } from '@/modules/communication/hooks/useSendMessage';
import { store } from '@/store';
import moment from 'moment';
import { useToast } from '@/hooks/useToast';
import { stringify } from 'qs';

const LIMIT_MESSAGE_LIST = 10;
const LIMIT_SUPPORT_LIST = 20;

function SupportWorker() {
  const { toastError } = useToast();
  const queryClient = useQueryClient();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [toolBarHeight, setToolBarHeight] = useState(0);
  const resolver = yupResolver(getMessageFormSchema());
  const [showLoadMoreButtonMessage, setShowLoadMoreButtonMessage] = useState(false);
  const [showLoadMoreButtonSupport, setShowLoadMoreButtonSupport] = useState(false);
  const [isScrollToBottom, setIsScrollToBottom] = useState(true);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const account = store.getState().auth.currentUser;
  const [supportSelected, setSupportSelected] = useState<SupportModel | undefined>();
  const [keepPreviousData, setKeepPreviousData] = useState(true);
  const [limitSupportList, setLimitSupportList] = useState(LIMIT_SUPPORT_LIST);
  const [limitMessageList, setLimitMessageList] = useState(LIMIT_MESSAGE_LIST);

  const {
    isFetching: isFetchingSupportFilter,
    isLoading: isLoadingSupportFilter,
    data: supportList,
    refetch: refetchSupportFilter,
  } = useGetSupportFilter(`limit=${limitSupportList}&page=1&supporter_id=${account?.id}`, {
    onSuccess(data) {
      if (!data) return;

      const { limit, page, total_rows } = data;

      setShowLoadMoreButtonSupport(Boolean(limit * page < (total_rows || 0)));
    },
  });

  const filterMessageQueryParams = stringify({
    page: 1,
    limit: limitMessageList,
    supporter_id:
      account?.account_type === 'OWNER' ? undefined : (supportSelected?.supporter_id as string),
    target_ask: supportSelected?.target_ask,
    worker_id: supportSelected?.worker_id,
  });

  const {
    isFetching: isFetchingMessageFilter,
    isLoading: isLoadingMessageFilter,
    isSuccess: isSuccessMessageFilter,
    data: messageList,
    refetch: refetchMessageFilter,
  } = useGetMessageFilter(
    filterMessageQueryParams,
    {
      enabled: Boolean(supportSelected),
      onSuccess(data) {
        if (!data) return;

        const { limit, page, total_rows } = data;

        setShowLoadMoreButtonMessage(Boolean(limit * page < (total_rows || 0)));
      },
    },
    keepPreviousData
  );

  const messageListReversed = useMemo(() => {
    return messageList?.rows?.reverse() as SupportModel[];
  }, [messageList?.rows]);

  useEffect(() => {
    setHeaderHeight(document.getElementById('kt_header')?.clientHeight || 0);
    setToolBarHeight(document.getElementById('kt_toolbar_container')?.clientHeight || 0);
  }, [supportSelected]);

  const formMethods = useForm<SupportMessage>({
    defaultValues: {},
    resolver,
  });

  const { mutateAsync: sendMessage, isLoading } = useSendMessage();
  const { mutateAsync } = useMutation(sendMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['support-filter'] });
      queryClient.invalidateQueries({ queryKey: ['message-filter'] });
    },
  });

  const onSubmit: SubmitHandler<SupportMessage> = async (formData) => {
    if (!supportSelected?.target_ask) {
      return toastError({
        title: 'Lỗi',
        subtitle: 'Đối tượng chat không xác định nên ko thể gửi tin nhắn!',
      });
    }

    const supporter_id =
      supportSelected.target_ask === 'COMPANY' ? undefined : supportSelected.supporter_id;

    const sendBody: SupportMessage = {
      ...formData,
      target_ask: supportSelected?.target_ask || '',
      sender: 'SUPPORTER',
      worker_id: supportSelected?.worker_id,
    };

    supporter_id && (sendBody.supporter_id = supporter_id);

    const res = await mutateAsync(sendBody);
    if (!res) return;
    formMethods.reset();
  };

  useEffect(() => {
    const container = messageContainerRef.current;
    if (container && isScrollToBottom) {
      scrollToBottom(container);
    }
  }, [supportSelected, messageList, isScrollToBottom]);

  const scrollToBottom = (container: HTMLDivElement) => {
    container.scrollTop = container.scrollHeight;
  };

  const handleLoadMoreMessage = () => {
    setLimitMessageList((prev) => prev + 10);
    setIsScrollToBottom(false);
    setKeepPreviousData(true);
  };

  const handleLoadMoreSupport = () => {
    setLimitSupportList((prev) => prev + 10);
  };

  const handleSelectSupport = (support: SupportModel, indexSelected: number) => {
    setSupportSelected({ ...support, indexSelected });
    setLimitMessageList(LIMIT_MESSAGE_LIST);
    setIsScrollToBottom(true);
    setKeepPreviousData(false);
  };

  return (
    <Fragment>
      <FormField className="form" methods={formMethods} onSubmit={onSubmit}>
        <div className="row py-6 gap-6">
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '1rem',
              height: `calc(100vh - ${headerHeight}px - ${toolBarHeight}px - 120px)`,
              overflow: 'auto',
              boxShadow: '0px 10px 30px 0px rgba(82, 63, 105, 0.05)',
            }}
            className="col-4"
          >
            {supportList?.rows?.length ? (
              <Fragment>
                {supportList?.rows.map((support, index) => {
                  return (
                    <div
                      className="row hover:bg-blue-700"
                      key={`${support.id}_${index}`}
                      style={{
                        padding: '.8rem',
                        borderBottom: '1px solid #DFE3E9',
                        backgroundColor:
                          `${supportSelected?.worker_id}_${supportSelected?.target_ask}` ===
                          `${support?.worker_id}_${support?.target_ask}`
                            ? '#E3F0FF'
                            : '#fff',
                      }}
                      onClick={() => {
                        handleSelectSupport(support, index);
                        formMethods.reset({});
                      }}
                    >
                      <div className="col-8">
                        <div className="d-flex items-center gap-3">
                          <Avatar
                            src={support.worker_info?.avatar || defaultAvatar}
                            style={{ flexShrink: 0 }}
                          />
                          <div style={{ flexGrow: 1 }}>{support.worker_info?.full_name}</div>
                        </div>
                      </div>
                      <div
                        className="col-4"
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          gap: '.5rem',
                        }}
                      >
                        <div>
                          {support.target_ask === 'COMPANY' ? (
                            <Badge
                              count={'Công ty'}
                              style={{
                                backgroundColor: '#006AFD',
                                color: 'white',
                                padding: '0 2rem',
                                textAlign: 'center',
                              }}
                            />
                          ) : support.target_ask === 'MANAGER' ? (
                            <Badge
                              count={'Quản lý'}
                              style={{
                                backgroundColor: '#00C22B',
                                color: 'white',
                                padding: '0 2rem',
                                textAlign: 'center',
                              }}
                            />
                          ) : (
                            <Badge
                              count={'Không xác định'}
                              style={{
                                backgroundColor: '#3F3F3F',
                                color: 'white',
                                padding: '0 2rem',
                                textAlign: 'center',
                              }}
                            />
                          )}
                        </div>
                      </div>

                      <div className="col-8 mt-2">
                        <p
                          style={{
                            overflow: 'hidden',
                            whiteSpace: 'pre-line',
                            textOverflow: 'ellipsis',
                            maxHeight: '20px',
                          }}
                        >
                          {support.message}
                        </p>
                      </div>
                      <div
                        className="col-4"
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <span>{moment(support.created_at).format('HH:mm DD/MM/YYYY')}</span>
                      </div>
                    </div>
                  );
                })}

                {showLoadMoreButtonSupport && (
                  <div
                    style={{
                      color: '#1E70DD',
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                      marginBlock: '1rem',
                      cursor: 'pointer',
                    }}
                    onClick={handleLoadMoreSupport}
                  >
                    Xem thêm
                  </div>
                )}
              </Fragment>
            ) : !isFetchingSupportFilter ? (
              <div
                style={{
                  padding: '1rem',
                }}
              >
                Không có cuộc hội thoại nào
              </div>
            ) : null}
          </div>
          {supportSelected ? (
            <div
              ref={messageContainerRef}
              className="row col-8"
              style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                height: `calc(100vh - ${headerHeight}px - ${toolBarHeight}px - 120px)`,
                overflow: 'auto',
                position: 'relative',
                padding: '0',
                boxShadow: '0px 10px 30px 0px rgba(82, 63, 105, 0.05)',
              }}
            >
              <div
                className="col-12"
                style={{
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.2rem',
                  justifyContent: 'center',
                  height: '5rem',
                  position: 'sticky',
                  top: '0',
                  left: '0',
                  zIndex: 10,
                  borderBottom: '2px solid #E9EDF1',
                }}
              >
                <p
                  style={{
                    margin: '0 .5rem',
                    fontWeight: 'bold',
                  }}
                >
                  {supportSelected.target_ask === 'COMPANY'
                    ? 'Công ty'
                    : supportSelected.target_ask === 'MANAGER'
                    ? 'Quản lý'
                    : 'Không xác định'}
                </p>
                {supportSelected.target_ask === 'MANAGER' ? (
                  <p style={{ color: '#8E99B1', margin: '0 .5rem' }}>
                    {supportSelected.manager_info?.name}
                  </p>
                ) : null}
              </div>
              {messageListReversed && isSuccessMessageFilter ? (
                <div
                  className="col-12"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div>
                    {showLoadMoreButtonMessage && (
                      <div
                        style={{
                          color: '#1E70DD',
                          textAlign: 'center',
                          textDecorationLine: 'underline',
                          marginBlock: '1rem',
                          cursor: 'pointer',
                        }}
                        onClick={handleLoadMoreMessage}
                      >
                        Xem thêm
                      </div>
                    )}

                    {messageListReversed.map((item, index: number) => {
                      return item.sender !== 'SUPPORTER' ? (
                        <div
                          className="row hover:bg-blue-700"
                          key={`${item}_${index}`}
                          style={{
                            //   backgroundColor: '#E3F0FF',
                            padding: '.8rem',
                            borderBottom: '1px solid #DFE3E9',
                          }}
                        >
                          <div
                            className="col-12"
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                          >
                            <div className="d-flex items-center gap-3">
                              <Avatar
                                src={item.worker_info?.avatar || defaultAvatar}
                                style={{ flexShrink: 0 }}
                              />
                              <div style={{ flexGrow: 1 }}>{item.worker_info?.full_name}</div>
                            </div>

                            <div className="col-4" style={{ width: 'fit-content' }}>
                              <span>{moment(item.created_at).format('HH:mm DD/MM/YYYY')}</span>
                            </div>
                          </div>

                          <div className="col-12 mt-2" style={{ whiteSpace: 'pre-line' }}>
                            <p>{item.message}</p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="row hover:bg-blue-700"
                          key={`${item}_${index}`}
                          style={{
                            backgroundColor: '#E3F0FF',
                            padding: '.8rem',
                            borderBottom: '1px solid #DFE3E9',
                          }}
                        >
                          <div
                            className="col-12"
                            style={{ display: 'flex', justifyContent: 'space-between' }}
                          >
                            <div className="d-flex items-center gap-3">
                              <Avatar
                                src={(account as any)?.avatar || defaultAvatar}
                                style={{ flexShrink: 0 }}
                              />
                              <div style={{ flexGrow: 1 }}>Bạn</div>
                            </div>
                            <div className="col-4" style={{ width: 'fit-content' }}>
                              <span>{moment(item.created_at).format('HH:mm DD/MM/YYYY')}</span>
                            </div>
                          </div>

                          <div className="col-12 mt-2" style={{ whiteSpace: 'pre-line' }}>
                            <p>{item.message}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Spin size="large" />
              )}
              <div
                className="py-6 col-12"
                style={{
                  backgroundColor: 'white',
                  minHeight: '10rem',
                  position: 'sticky',
                  bottom: -'1',
                  left: '0',
                  zIndex: 10,
                }}
              >
                <InputField
                  control={formMethods.control}
                  errorClass="ps-4"
                  groupClass="mb-5 w-fulll"
                  name="message"
                  placeholder="Nhập..."
                  rows={2}
                  type="textarea"
                  required
                  onPressEnter={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      document.getElementById('submit_message')?.click();
                    }
                  }}
                />

                <div className="w-100 d-flex justify-content-end" style={{ marginTop: 24 }}>
                  <Button
                    className="rounded-pill py-1 px-10"
                    type="submit"
                    disabled={!isSuccessMessageFilter}
                    id="submit_message"
                  >
                    Gửi
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </FormField>
    </Fragment>
  );
}

export default SupportWorker;
