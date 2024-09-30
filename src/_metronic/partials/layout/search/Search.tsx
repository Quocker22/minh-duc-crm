import React, { FC, useEffect, useRef, useState } from 'react';

import { SearchComponent } from '@/_metronic/assets/ts/components';
import { KTSVG, toAbsoluteUrl } from '@/_metronic/helpers';

const Search: FC = () => {
  const [menuState, setMenuState] = useState<'main' | 'advanced' | 'preferences'>('main');
  const element = useRef<HTMLDivElement | null>(null);
  const wrapperElement = useRef<HTMLDivElement | null>(null);
  const resultsElement = useRef<HTMLDivElement | null>(null);
  const suggestionsElement = useRef<HTMLDivElement | null>(null);
  const emptyElement = useRef<HTMLDivElement | null>(null);

  const processs = (search: SearchComponent) => {
    setTimeout(() => {
      const number = Math.floor(Math.random() * 6) + 1;

      // Hide recently viewed
      suggestionsElement.current!.classList.add('d-none');

      if (number === 3) {
        // Hide results
        resultsElement.current!.classList.add('d-none');

        // Show empty message
        emptyElement.current!.classList.remove('d-none');
      } else {
        // Show results
        resultsElement.current!.classList.remove('d-none');

        // Hide empty message
        emptyElement.current!.classList.add('d-none');
      }

      // Complete search
      search.complete();
    }, 1500);
  };

  const clear = (_search: SearchComponent) => {
    // Show recently viewed
    suggestionsElement.current!.classList.remove('d-none');

    // Hide results
    resultsElement.current!.classList.add('d-none');

    // Hide empty message
    emptyElement.current!.classList.add('d-none');
  };

  useEffect(() => {
    // Initialize search handler
    const searchObject = SearchComponent.createInsance('#kt_header_search');

    // Search handler
    searchObject!.on('kt.search.process', processs);

    // Clear handler
    searchObject!.on('kt.search.clear', clear);
  }, []);

  return (
    <>
      <div
        ref={element}
        className="d-flex align-items-stretch"
        data-kt-menu-overflow="false"
        data-kt-menu-permanent="true"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-trigger="auto"
        data-kt-search-enter="enter"
        data-kt-search-keypress="true"
        data-kt-search-layout="menu"
        data-kt-search-min-length="2"
        id="kt_header_search"
      >
        <div
          className="d-flex align-items-center"
          data-kt-search-element="toggle"
          id="kt_header_search_toggle"
        >
          <div className="btn btn-icon btn-active-light-primary w-30px h-30px w-md-40px h-md-40px">
            <KTSVG className="svg-icon-1" path="/media/icons/duotune/general/gen021.svg" />
          </div>
        </div>

        <div
          className="menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px"
          data-kt-search-element="content"
        >
          <div
            ref={wrapperElement}
            className={`${menuState === 'main' ? '' : 'd-none'}`}
            data-kt-search-element="wrapper"
          >
            <form
              autoComplete="off"
              className="w-100 position-relative mb-3"
              data-kt-search-element="form"
            >
              <KTSVG
                className="svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 translate-middle-y ms-0"
                path="/media/icons/duotune/general/gen021.svg"
              />

              <input
                className="form-control form-control-flush ps-10"
                data-kt-search-element="input"
                name="search"
                placeholder="Search..."
                type="text"
              />

              <span
                className="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-1"
                data-kt-search-element="spinner"
              >
                <span className="spinner-border h-15px w-15px align-middle text-gray-400" />
              </span>

              <span
                className="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none"
                data-kt-search-element="clear"
              >
                <KTSVG
                  className="svg-icon-2 svg-icon-lg-1 me-0"
                  path="/media/icons/duotune/arrows/arr061.svg"
                />
              </span>

              <div
                className="position-absolute top-50 end-0 translate-middle-y"
                data-kt-search-element="toolbar"
              >
                <div
                  className="btn btn-icon w-20px btn-sm btn-active-color-primary me-1"
                  data-bs-toggle="tooltip"
                  data-kt-search-element="preferences-show"
                  onClick={() => {
                    setMenuState('preferences');
                  }}
                  title="Show search preferences"
                >
                  <KTSVG className="svg-icon-1" path="/media/icons/duotune/coding/cod001.svg" />
                </div>

                <div
                  className="btn btn-icon w-20px btn-sm btn-active-color-primary"
                  data-bs-toggle="tooltip"
                  data-kt-search-element="advanced-options-form-show"
                  onClick={() => {
                    setMenuState('advanced');
                  }}
                  title="Show more search options"
                >
                  <KTSVG className="svg-icon-2" path="/media/icons/duotune/arrows/arr072.svg" />
                </div>
              </div>
            </form>

            <div ref={resultsElement} className="d-none" data-kt-search-element="results">
              <div className="scroll-y mh-200px mh-lg-350px">
                <h3 className="fs-5 text-muted m-0 pb-5" data-kt-search-element="category-title">
                  Users
                </h3>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <img alt="" src={toAbsoluteUrl('/media/avatars/300-6.jpg')} />
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Karina Clark</span>
                    <span className="fs-7 fw-bold text-muted">Marketing Manager</span>
                  </div>
                </a>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <img alt="" src={toAbsoluteUrl('/media/avatars/300-2.jpg')} />
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Olivia Bold</span>
                    <span className="fs-7 fw-bold text-muted">Software Engineer</span>
                  </div>
                </a>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <img alt="" src={toAbsoluteUrl('/media/avatars/300-9.jpg')} />
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Ana Clark</span>
                    <span className="fs-7 fw-bold text-muted">UI/UX Designer</span>
                  </div>
                </a>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <img alt="" src={toAbsoluteUrl('/media/avatars/300-14.jpg')} />
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Nick Pitola</span>
                    <span className="fs-7 fw-bold text-muted">Art Director</span>
                  </div>
                </a>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <img alt="" src={toAbsoluteUrl('/media/avatars/300-11.jpg')} />
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Edward Kulnic</span>
                    <span className="fs-7 fw-bold text-muted">System Administrator</span>
                  </div>
                </a>

                <h3
                  className="fs-5 text-muted m-0 pt-5 pb-5"
                  data-kt-search-element="category-title"
                >
                  Customers
                </h3>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <img
                        alt=""
                        className="w-20px h-20px"
                        src={toAbsoluteUrl('/media/svg/brand-logos/volicity-9.svg')}
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Company Rbranding</span>
                    <span className="fs-7 fw-bold text-muted">UI Design</span>
                  </div>
                </a>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <img
                        alt=""
                        className="w-20px h-20px"
                        src={toAbsoluteUrl('/media/svg/brand-logos/tvit.svg')}
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Company Re-branding</span>
                    <span className="fs-7 fw-bold text-muted">Web Development</span>
                  </div>
                </a>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <img
                        alt=""
                        className="w-20px h-20px"
                        src={toAbsoluteUrl('/media/svg/misc/infography.svg')}
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Business Analytics App</span>
                    <span className="fs-7 fw-bold text-muted">Administration</span>
                  </div>
                </a>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <img
                        alt=""
                        className="w-20px h-20px"
                        src={toAbsoluteUrl('/media/svg/brand-logos/leaf.svg')}
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">EcoLeaf App Launch</span>
                    <span className="fs-7 fw-bold text-muted">Marketing</span>
                  </div>
                </a>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <img
                        alt=""
                        className="w-20px h-20px"
                        src={toAbsoluteUrl('/media/svg/brand-logos/tower.svg')}
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column justify-content-start fw-bold">
                    <span className="fs-6 fw-bold">Tower Group Website</span>
                    <span className="fs-7 fw-bold text-muted">Google Adwords</span>
                  </div>
                </a>

                <h3
                  className="fs-5 text-muted m-0 pt-5 pb-5"
                  data-kt-search-element="category-title"
                >
                  Projects
                </h3>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        className="svg-icon-2 svg-icon-primary"
                        path="/media/icons/duotune/general/gen005.svg"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <span className="fs-6 fw-bold">Si-Fi Project by AU Themes</span>
                    <span className="fs-7 fw-bold text-muted">#45670</span>
                  </div>
                </a>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        className="svg-icon-2 svg-icon-primary"
                        path="/media/icons/duotune/general/gen032.svg"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <span className="fs-6 fw-bold">Shopix Mobile App Planning</span>
                    <span className="fs-7 fw-bold text-muted">#45690</span>
                  </div>
                </a>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        className="svg-icon-2 svg-icon-primary"
                        path="/media/icons/duotune/communication/com012.svg"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <span className="fs-6 fw-bold">Finance Monitoring SAAS Discussion</span>
                    <span className="fs-7 fw-bold text-muted">#21090</span>
                  </div>
                </a>

                <a
                  className="d-flex text-dark text-hover-primary align-items-center mb-5"
                  href="/#"
                >
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        className="svg-icon-2 svg-icon-primary"
                        path="/media/icons/duotune/communication/com006.svg"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <span className="fs-6 fw-bold">Dashboard Analitics Launch</span>
                    <span className="fs-7 fw-bold text-muted">#34560</span>
                  </div>
                </a>
              </div>
            </div>

            <div ref={suggestionsElement} className="mb-4" data-kt-search-element="main">
              <div className="d-flex flex-stack fw-bold mb-4">
                <span className="text-muted fs-6 me-2">Recently Searched:</span>
              </div>

              <div className="scroll-y mh-200px mh-lg-325px">
                <div className="d-flex align-items-center mb-5">
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        className="svg-icon-2 svg-icon-primary"
                        path="/media/icons/duotune/electronics/elc004.svg"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <a className="fs-6 text-gray-800 text-hover-primary fw-bold" href="/#">
                      BoomApp by Keenthemes
                    </a>
                    <span className="fs-7 text-muted fw-bold">#45789</span>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-5">
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        className="svg-icon-2 svg-icon-primary"
                        path="/media/icons/duotune/graphs/gra001.svg"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <a className="fs-6 text-gray-800 text-hover-primary fw-bold" href="/#">
                      "Kept API Project Meeting
                    </a>
                    <span className="fs-7 text-muted fw-bold">#84050</span>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-5">
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        className="svg-icon-2 svg-icon-primary"
                        path="/media/icons/duotune/graphs/gra006.svg"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <a className="fs-6 text-gray-800 text-hover-primary fw-bold" href="/#">
                      "KPI Monitoring App Launch
                    </a>
                    <span className="fs-7 text-muted fw-bold">#84250</span>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-5">
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        className="svg-icon-2 svg-icon-primary"
                        path="/media/icons/duotune/graphs/gra002.svg"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <a className="fs-6 text-gray-800 text-hover-primary fw-bold" href="/#">
                      Project Reference FAQ
                    </a>
                    <span className="fs-7 text-muted fw-bold">#67945</span>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-5">
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        className="svg-icon-2 svg-icon-primary"
                        path="/media/icons/duotune/communication/com010.svg"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <a className="fs-6 text-gray-800 text-hover-primary fw-bold" href="/#">
                      "FitPro App Development
                    </a>
                    <span className="fs-7 text-muted fw-bold">#84250</span>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-5">
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        className="svg-icon-2 svg-icon-primary"
                        path="/media/icons/duotune/finance/fin001.svg"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <a className="fs-6 text-gray-800 text-hover-primary fw-bold" href="/#">
                      Shopix Mobile App
                    </a>
                    <span className="fs-7 text-muted fw-bold">#45690</span>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-5">
                  <div className="symbol symbol-40px me-4">
                    <span className="symbol-label bg-light">
                      <KTSVG
                        className="svg-icon-2 svg-icon-primary"
                        path="/media/icons/duotune/graphs/gra002.svg"
                      />
                    </span>
                  </div>

                  <div className="d-flex flex-column">
                    <a className="fs-6 text-gray-800 text-hover-primary fw-bold" href="/#">
                      "Landing UI Design" Launch
                    </a>
                    <span className="fs-7 text-muted fw-bold">#24005</span>
                  </div>
                </div>
              </div>
            </div>

            <div ref={emptyElement} className="text-center d-none" data-kt-search-element="empty">
              <div className="pt-10 pb-10">
                <KTSVG
                  className="svg-icon-4x opacity-50"
                  path="/media/icons/duotune/files/fil024.svg"
                />
              </div>

              <div className="pb-15 fw-bold">
                <h3 className="text-gray-600 fs-5 mb-2">No result found</h3>
                <div className="text-muted fs-7">Please try again with a different query</div>
              </div>
            </div>
          </div>

          <form className={`pt-1 ${menuState === 'advanced' ? '' : 'd-none'}`}>
            <h3 className="fw-bold text-dark mb-7">Advanced Search</h3>

            <div className="mb-5">
              <input
                className="form-control form-control-sm form-control-solid"
                name="query"
                placeholder="Contains the word"
                type="text"
              />
            </div>

            <div className="mb-5">
              <div className="nav-group nav-group-fluid">
                <label>
                  <input
                    className="btn-check"
                    name="type"
                    type="radio"
                    value="has"
                    defaultChecked
                  />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary">
                    All
                  </span>
                </label>

                <label>
                  <input className="btn-check" name="type" type="radio" value="users" />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                    Users
                  </span>
                </label>

                <label>
                  <input className="btn-check" name="type" type="radio" value="orders" />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                    Orders
                  </span>
                </label>

                <label>
                  <input className="btn-check" name="type" type="radio" value="projects" />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                    Projects
                  </span>
                </label>
              </div>
            </div>

            <div className="mb-5">
              <input
                className="form-control form-control-sm form-control-solid"
                name="assignedto"
                placeholder="Assigned to"
                type="text"
              />
            </div>

            <div className="mb-5">
              <input
                className="form-control form-control-sm form-control-solid"
                name="collaborators"
                placeholder="Collaborators"
                type="text"
              />
            </div>

            <div className="mb-5">
              <div className="nav-group nav-group-fluid">
                <label>
                  <input
                    className="btn-check"
                    name="attachment"
                    type="radio"
                    value="has"
                    defaultChecked
                  />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary">
                    Has attachment
                  </span>
                </label>

                <label>
                  <input className="btn-check" name="attachment" type="radio" value="any" />
                  <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                    Any
                  </span>
                </label>
              </div>
            </div>

            <div className="mb-5">
              <select
                aria-label="Select a Timezone"
                className="form-select form-select-sm form-select-solid"
                data-control="select2"
                data-placeholder="date_period"
                name="timezone"
              >
                <option value="next">Within the next</option>
                <option value="last">Within the last</option>
                <option value="between">Between</option>
                <option value="on">On</option>
              </select>
            </div>

            <div className="row mb-8">
              <div className="col-6">
                <input
                  className="form-control form-control-sm form-control-solid"
                  name="date_number"
                  placeholder="Lenght"
                  type="number"
                />
              </div>

              <div className="col-6">
                <select
                  aria-label="Select a Timezone"
                  className="form-select form-select-sm form-select-solid"
                  data-control="select2"
                  data-placeholder="Period"
                  name="date_typer"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button
                className="btn btn-sm btn-light fw-bolder btn-active-light-primary me-2"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuState('main');
                }}
              >
                Cancel
              </button>

              <a
                className="btn btn-sm fw-bolder btn-primary"
                data-kt-search-element="advanced-options-form-search"
                href="/#"
              >
                Search
              </a>
            </div>
          </form>

          <form className={`pt-1 ${menuState === 'preferences' ? '' : 'd-none'}`}>
            <h3 className="fw-bold text-dark mb-7">Search Preferences</h3>

            <div className="pb-4 border-bottom">
              <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                  Projects
                </span>

                <input className="form-check-input" type="checkbox" value="1" defaultChecked />
              </label>
            </div>

            <div className="py-4 border-bottom">
              <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                  Targets
                </span>
                <input className="form-check-input" type="checkbox" value="1" defaultChecked />
              </label>
            </div>

            <div className="py-4 border-bottom">
              <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                  Affiliate Programs
                </span>
                <input className="form-check-input" type="checkbox" value="1" />
              </label>
            </div>

            <div className="py-4 border-bottom">
              <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">
                  Referrals
                </span>
                <input className="form-check-input" type="checkbox" value="1" defaultChecked />
              </label>
            </div>

            <div className="py-4 border-bottom">
              <label className="form-check form-switch form-switch-sm form-check-custom form-check-solid flex-stack">
                <span className="form-check-label text-gray-700 fs-6 fw-bold ms-0 me-2">Users</span>
                <input className="form-check-input" type="checkbox" />
              </label>
            </div>

            <div className="d-flex justify-content-end pt-7">
              <button
                className="btn btn-sm btn-light fw-bolder btn-active-light-primary me-2"
                onClick={(e) => {
                  e.preventDefault();
                  setMenuState('main');
                }}
              >
                Cancel
              </button>
              <button className="btn btn-sm fw-bolder btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { Search };
