import SelectGroupOrderBy from '../Forms/SelectGroup/SelectGroupOrderBy';


const TableRecentUpload = () => {

  const publications = new Array(7).fill(null);

  return (
//#region 

    // <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    //   <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
    //     Recent Upload
    //   </h4>

    //   <div className="flex flex-col">
    //     <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
    //       <div className="p-1 text-center xl:p-1">
    //         <h5 className="text-sm font-medium uppercase xsm:text-base">
    //           EMAIL
    //         </h5>
    //       </div>
          
    //       <div className="p-1 text-center xl:p-1">
    //         <h5 className="text-sm font-medium uppercase xsm:text-base">
    //           Title
    //         </h5>
    //       </div>
    //       <div className="p-1 text-center xl:p-1">
    //         <h5 className="text-sm font-medium uppercase xsm:text-base">
    //           Revenues
    //         </h5>
    //       </div>
    //       <div className="hidden p-1 text-center sm:block xl:p-1">
    //         <h5 className="text-sm font-medium uppercase xsm:text-base">
    //           Sales
    //         </h5>
    //       </div>
    //       <div className="hidden p-1 text-center sm:block xl:p-1">
    //         <h5 className="text-sm font-medium uppercase xsm:text-base">
    //           Conversion
    //         </h5>
    //       </div>
    //     </div>

    //     {brandData.map((brand, key) => (
    //       <div
    //         className={`grid grid-cols-3 sm:grid-cols-5 ${
    //           key === brandData.length - 1
    //             ? ''
    //             : 'border-b border-stroke dark:border-strokedark'
    //         }`}
    //         key={key}
    //       >
    //         <div className="flex items-center gap-3 p-2.5 xl:p-1">
    //           <div className="flex-shrink-0">
    //             <img src={brand.logo} alt="Brand" />
    //           </div>
    //           <p className="hidden text-black dark:text-white sm:block">
    //             {brand.name}
    //           </p>
    //         </div>

    //         <div className="flex items-center justify-center p-1 xl:p-1">
    //           <p className="text-black dark:text-white">{brand.visitors}K</p>
    //         </div>

    //         <div className="flex items-center justify-center p-1 xl:p-1">
    //           <p className="text-meta-3">${brand.revenues}</p>
    //         </div>

    //         <div className="hidden items-center justify-center p-1 sm:flex xl:p-1">
    //           <p className="text-black dark:text-white">{brand.sales}</p>
    //         </div>

    //         <div className="hidden items-center justify-center p-1 sm:flex xl:p-1">
    //           <p className="text-meta-5">{brand.conversion}%</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
//#endregion

    <div className="rounded-sm border border-stroke bg-[#EDFEFF] px-5 lg:px-70 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 overflow-y-auto max-h-[100vh]">

    <div className="flex items-center justify-center p-1 xl:p-1">
        <h1 className="text-lg font-bold uppercase xsm:text-xl text-[#17C0CC]">Publication</h1>
    </div>


    <div className="relative flex items-center justify-center m-5 p-1 xl:p-1">
      <div className="w-full md:w-96 xl:w-1/2 relative flex items-center m-5 p-1 xl:p-1 rounded-lg border-[1.5px] border-stroke bg-[#85E0E7] dark:focus:border-stroke dark:text-white ">
      <input
          type="text"
          placeholder="Search Publication"
          className="w-full text-black outline-none transition dark:border-form-strokedark bg-[#85E0E7]"
      />

        <svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 296.999 296.999">
              <g>
                <g>
                  <g>
                    <path d="M156.215,53.603c-13.704-13.704-31.924-21.251-51.302-21.251c-19.38,0-37.6,7.548-51.302,21.251
                      c-3.855,3.855-3.855,10.105,0,13.96c3.856,3.854,10.104,3.854,13.96,0c9.974-9.975,23.236-15.469,37.342-15.469
                      c14.106,0,27.368,5.494,37.342,15.469c20.59,20.59,20.59,54.094,0,74.685c-3.855,3.855-3.855,10.105,0,13.96
                      c1.928,1.927,4.454,2.891,6.98,2.891s5.052-0.964,6.98-2.891C184.503,127.92,184.503,81.891,156.215,53.603z"/>
                    <path d="M289.054,250.651l-93.288-93.288c23.145-40.108,17.591-92.372-16.674-126.637C159.278,10.912,132.933,0,104.913,0
                      c-28.022,0-54.365,10.912-74.18,30.727C10.918,50.542,0.007,76.884,0.007,104.906c0,28.021,10.912,54.365,30.727,74.179
                      c20.452,20.451,47.315,30.676,74.179,30.676c18.145,0,36.287-4.672,52.456-14.003l93.289,93.287
                      c5.127,5.129,11.946,7.954,19.197,7.954c7.253,0,14.071-2.824,19.198-7.953C299.639,278.461,299.639,261.238,289.054,250.651z
                      M104.913,190.029c-21.806-0.003-43.619-8.303-60.219-24.904c-16.086-16.085-24.945-37.471-24.945-60.219
                      s8.859-44.134,24.945-60.219c16.085-16.086,37.471-24.945,60.219-24.945c22.748,0,44.133,8.859,60.219,24.945
                      c33.205,33.205,33.205,87.233,0,120.438C148.528,181.729,126.724,190.031,104.913,190.029z M275.094,275.088
                      c-1.4,1.399-3.259,2.17-5.238,2.17c-1.978,0-3.838-0.771-5.237-2.171l-90.952-90.951c1.852-1.61,3.664-3.289,5.426-5.051
                      c1.761-1.761,3.441-3.573,5.05-5.425l90.951,90.951C277.982,267.5,277.982,272.199,275.094,275.088z"/>
                  </g>
                </g>
              </g>
        </svg>
      </div>
  </div>





    
    <div className="bg-white px-1 pt-1 pb-1 bg-[#EDFEFF] dark:border-strokedark dark:bg-boxdark sm:px-1 xl:pb-1">
      <div className="flex items-center justify-between gap-3 p-1 xl:p-1">
        <div className="flex items-center justify-center">
        <h1 className="text-sm font-bold uppercase xsm:text-base text-[#6F9B9E]">1000+ Publication Found</h1>     
        </div>
        <div className="flex items-center justify-center">
          <SelectGroupOrderBy Title='Order by' />
        </div>

      </div>           
    </div>

    <div className="overflow-y-auto max-h-[100vh]">
    {publications.map((_, index) => (
        <div key={index + 1} id={`publication-${index + 1}`} className="flex flex-col px-4 py-1 mt-4 border-b border-gray-300">
         <h5 className="text-xs font-bold uppercase xsm:text-sm text-[#6F9B9E]"><b>Publication {index + 1}</b></h5>

         <div className="block md:flex items-center justify-between">
            <div className="text-[#6F9B9E]">This is a placeholder text for the title of the publication</div>
            <div>
            <button className="mt-2 mb-2 md:m-0 flex items-center justify-between px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-[11px]">
              <svg className="svg-icon w-4 h-4" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path d="M901.850593 926.476283a48.761858 48.761858 0 0 1-48.761859 48.761859H170.422718a48.761858 48.761858 0 0 1-48.761858-48.761859V48.762834a48.761858 48.761858 0 0 1 48.761858-48.761859h418.864363a48.761858 48.761858 0 0 1 34.620919 14.140939l263.801654 263.801654a48.761858 48.761858 0 0 1 14.140939 34.620919V926.476283z" fill="#EBECF0" />
                <path d="M901.850593 926.476283v48.761859a48.761858 48.761858 0 0 1-48.761859 48.761858H170.422718a48.761858 48.761858 0 0 1-48.761858-48.761858v-48.761859a48.761858 48.761858 0 0 0 48.761858 48.761859h682.666016a48.761858 48.761858 0 0 0 48.761859-48.761859z" fill="#C1C7D0" />
                <path d="M24.137143 536.381417h975.237166v243.809291a48.761858 48.761858 0 0 1-48.761858 48.761859H72.899001a48.761858 48.761858 0 0 1-48.761858-48.761859v-243.809291z" fill="#FF5630" />
                <path d="M121.66086 536.381417V438.8577l-97.523717 97.523717h97.523717zM901.850593 536.381417l0.975237-97.523717 97.036098 97.523717H901.850593z" fill="#DE350B" />
                <path d="M267.946434 585.143275h84.845634a57.051374 57.051374 0 0 1 41.935198 15.603795 55.1009 55.1009 0 0 1 16.091413 40.959961 55.588518 55.588518 0 0 1-16.091413 40.959961 59.001849 59.001849 0 0 1-43.398054 16.091413h-48.761858v76.556118H267.946434z m32.670446 81.919922h43.885672a42.422817 42.422817 0 0 0 25.843785-6.339041 23.893311 23.893311 0 0 0 7.801897-19.992362q0-24.868548-32.670445-24.868548h-44.860909zM434.71199 588.068987H511.755726a73.142787 73.142787 0 0 1 58.51423 25.356166 100.937047 100.937047 0 0 1 21.942836 68.266602 110.689418 110.689418 0 0 1-20.967599 69.729457A71.679932 71.679932 0 0 1 511.755726 780.190708H434.71199z m32.670445 158.963658H511.755726a43.398054 43.398054 0 0 0 36.083775-17.066651A75.093262 75.093262 0 0 0 560.517584 682.666992a70.704695 70.704695 0 0 0-13.65332-48.761859 48.761858 48.761858 0 0 0-37.546631-16.579031h-41.935198zM755.565018 618.788957h-100.937047v45.348529H755.565018v31.207589h-100.937047v81.919922h-32.670445v-190.171248H755.565018z" fill="#FFFFFF" />
                <path d="M901.850593 312.564487v6.82666h-263.801654a48.761858 48.761858 0 0 1-48.761858-48.761858V0.000975a48.761858 48.761858 0 0 1 34.620919 14.140939l264.289272 263.801654a48.761858 48.761858 0 0 1 13.653321 34.620919z" fill="#C1C7D0" />
              </svg>
              <span className="pl-2">Download PDF</span>
            </button>    
            </div>
          </div>
        </div>
      ))}

    </div>






    



    
    





  </div>
  );
};

export default TableRecentUpload;
