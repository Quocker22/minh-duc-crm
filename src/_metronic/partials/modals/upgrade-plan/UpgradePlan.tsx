import React, { FC, useState } from 'react';

import { KTSVG } from '@/_metronic/helpers';

const plans = [
  {
    custom: false,
    default: true,
    description: 'Optimal for 10+ team size and new startup',
    features: [
      {
        supported: true,
        title: 'Up to 10 Active Users',
      },
      {
        supported: true,
        title: 'Up to 30 Project Integrations',
      },
      {
        supported: true,
        title: 'Analytics Module',
      },
      {
        supported: false,
        title: 'Finance Module',
      },
      {
        supported: false,
        title: 'Accounting Module',
      },
      {
        supported: false,
        title: 'Network Platform',
      },
      {
        supported: false,
        title: 'Unlimited Cloud Space',
      },
    ],
    priceAnnual: '399',
    priceMonth: '39',
    subTitle: 'Best for startups',
    title: 'Startup',
  },

  {
    custom: false,
    default: false,
    description: 'Optimal for 100+ team size and grown company',
    features: [
      {
        supported: true,
        title: 'Up to 10 Active Users',
      },
      {
        supported: true,
        title: 'Up to 30 Project Integrations',
      },
      {
        supported: true,
        title: 'Analytics Module',
      },
      {
        supported: true,
        title: 'Finance Module',
      },
      {
        supported: true,
        title: 'Accounting Module',
      },
      {
        supported: false,
        title: 'Network Platform',
      },
      {
        supported: false,
        title: 'Unlimited Cloud Space',
      },
    ],
    priceAnnual: '3399',
    priceMonth: '339',
    subTitle: 'Best for 100+ team size',
    title: 'Advanced',
  },

  {
    custom: false,
    default: false,
    description: 'Optimal for 1000+ team and enterpise',
    features: [
      {
        supported: true,
        title: 'Up to 10 Active Users',
      },
      {
        supported: true,
        title: 'Up to 30 Project Integrations',
      },
      {
        supported: true,
        title: 'Analytics Module',
      },
      {
        supported: true,
        title: 'Finance Module',
      },
      {
        supported: true,
        title: 'Accounting Module',
      },
      {
        supported: true,
        title: 'Network Platform',
      },
      {
        supported: true,
        title: 'Unlimited Cloud Space',
      },
    ],
    label: 'Most popular',
    priceAnnual: '9999',
    priceMonth: '999',
    subTitle: 'Best value for 1000+ team',
    title: 'Enterprise',
  },

  {
    custom: true,
    default: false,
    subTitle: 'Requet a custom license',
    title: 'Custom',
  },
];

const UpgradePlan: FC = () => {
  const [currentState, setCurrentState] = useState<'month' | 'annual'>('month');
  const [selected, setSelected] = useState('Startup');

  return (
    <div aria-hidden="true" className="modal fade" id="kt_modal_upgrade_plan">
      <div className="modal-dialog modal-xl">
        <div className="modal-content rounded">
          <div className="modal-header justify-content-end border-0 pb-0">
            <div className="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
              <KTSVG className="svg-icon-1" path="/media/icons/duotune/arrows/arr061.svg" />
            </div>
          </div>

          <div className="modal-body pt-0 pb-15 px-5 px-xl-20">
            <div className="mb-13 text-center">
              <h1 className="mb-3">Upgrade a Plan</h1>

              <div className="text-muted fw-bold fs-5">
                If you need more info, please check{' '}
                <a className="link-primary fw-bolder" href="#">
                  Pricing Guidelines
                </a>
                .
              </div>
            </div>

            <div className="d-flex flex-column">
              <div className="nav-group nav-group-outline mx-auto" data-kt-buttons="true">
                <button
                  className={
                    'btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3 me-2 ' +
                    (currentState === 'month' && 'active')
                  }
                  data-kt-plan="month"
                  onClick={() => {
                    setCurrentState('month');
                  }}
                  type="button"
                >
                  Monthly
                </button>
                <button
                  className={
                    'btn btn-color-gray-400 btn-active btn-active-secondary px-6 py-3 me-2 ' +
                    (currentState === 'annual' && 'active')
                  }
                  data-kt-plan="annual"
                  onClick={() => {
                    setCurrentState('annual');
                  }}
                  type="button"
                >
                  Annual
                </button>
              </div>

              <div className="row mt-10">
                <div className="col-lg-6 mb-10 mb-lg-0">
                  <div className="nav flex-column">
                    {plans.map((plan, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            `nav-link btn btn-outline btn-outline-dashed btn-color-dark d-flex flex-stack text-start p-6 ` +
                            (index !== plans.length - 1 && 'mb-6 ') +
                            (plan.default && 'active ') +
                            (!plan.custom && 'btn-active btn-active-primary ')
                          }
                          data-bs-target={`#kt_upgrade_plan_${index}`}
                          data-bs-toggle="tab"
                          onClick={() => {
                            setSelected(plan.title);
                          }}
                        >
                          <div className="d-flex align-items-center me-2">
                            <div className="form-check form-check-custom form-check-solid form-check-success me-6">
                              <input
                                checked={selected === plan.title}
                                className="form-check-input"
                                name="plan"
                                onChange={(e) => setSelected(e.target.value)}
                                type="radio"
                                value={plan.title}
                              />
                            </div>

                            <div className="flex-grow-1">
                              <h2 className="d-flex align-items-center fs-2 fw-bolder flex-wrap">
                                {plan.title}

                                {plan.label && (
                                  <span className="badge badge-light-success ms-2 fs-7">
                                    {plan.label}
                                  </span>
                                )}
                              </h2>
                              <div className="fw-bold opacity-50">{plan.subTitle}</div>
                            </div>
                          </div>

                          <div className="ms-5">
                            {plan.custom && (
                              <button className="btn btn-sm btn-primary">Contact Us</button>
                            )}
                            {!plan.custom && (
                              <>
                                <span className="mb-2">$</span>

                                <span className="fs-3x fw-bolder">
                                  {currentState === 'month' ? plan.priceMonth : plan.priceAnnual}
                                </span>

                                <span className="fs-7 opacity-50">
                                  /<span data-kt-element="period">Mon</span>
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="tab-content rounded h-100 bg-light p-10">
                    {plans.map((plan, index) => {
                      return (
                        <div key={`custom${index}`}>
                          {!plan.custom && (
                            <>
                              <div
                                key={index}
                                className={`tab-pane fade` + (plan.default && 'show active')}
                                id={`kt_upgrade_plan_${index}`}
                              >
                                <div className="pb-5">
                                  <h2 className="fw-bolder text-dark">What’s in Startup Plan?</h2>

                                  <div className="text-gray-400 fw-bold">{plan.description}</div>
                                </div>

                                <div className="pt-1">
                                  {plan.features!.map((feature, i) => {
                                    return (
                                      <div
                                        key={`${i}-${feature.title}`}
                                        className={
                                          `d-flex align-items-center` +
                                          (i !== plan.features!.length - 1 && ' mb-7')
                                        }
                                      >
                                        {feature.supported && (
                                          <>
                                            <span className="fw-bold fs-5 text-gray-700 flex-grow-1">
                                              {feature.title}
                                            </span>

                                            <KTSVG
                                              className="svg-icon-1 svg-icon-success"
                                              path="/media/icons/duotune/general/gen043.svg"
                                            />
                                          </>
                                        )}
                                        {!feature.supported && (
                                          <>
                                            <span className="fw-bold fs-5 text-gray-400 flex-grow-1">
                                              {feature.title}
                                            </span>
                                            <KTSVG
                                              className="svg-icon-1"
                                              path="/media/icons/duotune/general/gen040.svg"
                                            />
                                          </>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-center flex-row-fluid pt-12">
              <button className="btn btn-light me-3" data-bs-dismiss="modal" type="reset">
                Cancel
              </button>

              <button className="btn btn-primary" type="submit">
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UpgradePlan };
