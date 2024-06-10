import SmButton from '../components/form/SmButton';
import ukFlag from '../assets/uk_flag.svg';
import deFlag from '../assets/de.svg';
import esFlag from '../assets/esFlag.svg';

export const plansMockData = {
  headings: [
    {
      value: 'User',
      key: 'user',
    },
    {
      value: 'Patient',
      key: 'patient',
    },
    {
      value: 'Patient Number',
      key: 'patientNumber',
    },
    {
      value: 'Planning Status',
      key: 'planningStatus',
    },
    {
      value: '',
      key: 'actions',
    },
  ],
  data: Array(10)
    .fill({})
    .map((item, index) => ({
      id: index + 1,
      user: 'Tom Cruise',
      patient: 'John Doe',
      patientNumber: '56565',
      planningStatus: <span className='color-sky'>Sent</span>,
      actions: (
        <SmButton
          variant='small'
          theme='primary'
          title='See'
          onClick={() => window.location.replace('/plannings/patient-plans/5')}
        />
      ),
    })),
};

export const patientPlansMockData = {
  headings: [
    {
      value: 'Date',
      key: 'date',
    },
    {
      value: 'Planning Number',
      key: 'planningNumber',
    },
    {
      value: 'Product',
      key: 'product',
    },
    {
      value: 'Planning Status',
      key: 'planningStatus',
    },
    {
      value: '',
      key: 'actions',
    },
  ],
  data: Array(10)
    .fill({})
    .map((item, index) => ({
      id: index + 1,
      date: '06/10/2023',
      planningNumber: '563232',
      product: 'Product 1',
      planningStatus: <span className='color-sky'>Awaiting Approval</span>,
      actions: (
        <div className='planningTableActions'>
          <SmButton
            variant='small'
            theme='primary'
            title='See'
            onClick={() =>
              window.location.replace('/plannings/patient-plan-record/5')
            }
          />
          <SmButton
            variant='small'
            theme='danger'
            title='Delete'
            onClick={() =>
              window.location.replace('/plannings/patient-plans/5')
            }
          />
        </div>
      ),
    })),
};

export const patientPlanRecordsMockData = {
  headings: [
    {
      value: 'Date',
      key: 'date',
    },
    {
      value: '',
      key: 'treatment',
    },
    {
      value: '',
      key: 'actions',
    },
  ],
  data: Array(10)
    .fill({})
    .map((item, index) => ({
      id: index + 1,
      date: '06/10/2023',
      treatment: `Treatment ${index + 1}`,
      actions: (
        <div className='planningTableActions'>
          <>
            {index % 2 === 0 ? (
              <>
                <SmButton
                  variant='small'
                  theme='primary'
                  title='View Report'
                  onClick={() =>
                    window.location.replace('/patient-plan-record/5')
                  }
                />
                <SmButton
                  variant='small'
                  theme='primary'
                  title='Edit Report'
                  onClick={() =>
                    window.location.replace('/patient-plan-record/5')
                  }
                />
                <SmButton
                  variant='small'
                  theme='primary'
                  title='See Simulation'
                  onClick={() =>
                    window.location.replace('/patient-plan-record/5')
                  }
                />
                <SmButton
                  variant='small'
                  theme='primary'
                  title='Edit Simulation'
                  onClick={() =>
                    window.location.replace('/patient-plan-record/5')
                  }
                />
                <SmButton
                  variant='small'
                  theme='danger'
                  title='Delete'
                  onClick={() => window.location.replace('/patient-plans/5')}
                />
              </>
            ) : (
              <SmButton
                variant='small'
                theme='primary'
                title='See'
                onClick={() =>
                  window.location.replace('/plannings/change-plan/5')
                }
              />
            )}
          </>
        </div>
      ),
    })),
};

// USERS
export const usersMockData = {
  headings: [
    {
      value: 'User Number',
      key: 'userNumber',
    },
    {
      value: 'User',
      key: 'user',
    },
    {
      value: '',
      key: 'actions',
    },
  ],
  data: Array(10)
    .fill({})
    .map((item, index) => ({
      id: index + 1,
      userNumber: 'QA58',
      user: 'Laura Foyu',
      actions: (
        <div className='planningTableActions'>
          <SmButton
            variant='small'
            theme='primary'
            title='View Profile'
            onClick={() => window.location.replace('/users/profile/5')}
          />
          <SmButton
            variant='small'
            theme='primary'
            title='See Planning'
            onClick={() => window.location.replace('/users/user-plans/5')}
          />
        </div>
      ),
    })),
};

export const userPlansMockData = {
  headings: [
    {
      value: 'Patient',
      key: 'name',
    },
    {
      value: 'Patient Number',
      key: 'patientNumber',
    },
    {
      value: '',
      key: 'actions',
    },
  ],
  data: Array(10)
    .fill({})
    .map((item, index) => ({
      id: index + 1,
      patient: 'Sandy L',
      patientNumber: '563232',
      planningStatus: <span className='color-sky'>Awaiting Approval</span>,
      actions: (
        <div className='planningTableActions'>
          <SmButton
            variant='small'
            theme='primary'
            title='See'
            onClick={() =>
              window.location.replace('/user/plannings/patient-plans/5')
            }
          />
        </div>
      ),
    })),
};

export const defaultTableData = Array(10)
  .fill({})
  .map(() => ({
    date: '06/10/2023',
    user: 'Laura Fuyo',
    patient: 'George Bill',
    product: 'Product 1',
    order: '523232',
    actions: (
      <div className='planningTableActions'>
        <SmButton title='See' variant='small' theme='primary' />
        <SmButton title='Delete' variant='small' theme='danger' />
      </div>
    ),
  }));

export const billingMockData = {
  headings: [
    {
      value: 'Date',
      key: 'date',
    },
    {
      value: 'User',
      key: 'user',
    },
    {
      value: 'Patient',
      key: 'patient',
    },
    {
      value: 'Product',
      key: 'product',
    },
    {
      value: 'Order',
      key: 'order',
    },
    {
      value: '',
      key: 'actions',
    },
  ],
  data: Array(11)
    .fill({})
    .map(() => ({
      date: '06/10/2023',
      user: 'Laura Fuyo',
      patient: 'George Bill',
      product: 'Product 1',
      order: '523232',
      actions: (
        <div div className='planningTableActions'>
          <SmButton
            variant='small'
            theme='primary'
            title='Download'
            // onClick={() => window.location.replace("/patient-plans/5")}
          />
          <SmButton
            variant='small'
            theme='primary'
            title='See'
            // onClick={() => window.location.replace("/patient-plans/5")}
          />
          <SmButton
            title='Delete'
            variant='small'
            theme='danger'
            // onClick={() => window.location.replace("/patient-plans/5")}
          />
        </div>
      ),
    })),
};

export const queriesMockData = {
  headings: [
    {
      value: 'description.date',
      key: 'date',
    },
    {
      value: 'Query Number',
      key: 'queryNumber',
    },
    {
      value: 'User',
      key: 'user',
    },
    {
      value: 'Query Subject',
      key: 'querySubject',
    },
    {
      value: '',
      key: 'actions',
    },
  ],
  data: Array(10)
    .fill({})
    .map(() => ({
      date: '06/10/2023',
      queryNumber: 'QA58',
      user: 'George Bill',
      querySubject: 'Pending approval',
      actions: (
        <div div className='planningTableActions'>
          <SmButton
            variant='small'
            theme='primary'
            title='See'
            onClick={() => window.location.replace('/query/5')}
          />
          <SmButton
            title='Delete'
            variant='small'
            theme='danger'
            // onClick={() => window.location.replace("/patient-plans/5")}
          />
        </div>
      ),
    })),
};

// USER PANEL

export const userPatientPlansMockData = {
  headings: [
    {
      value: 'Date',
      key: 'date',
    },
    {
      value: 'Planning',
      key: 'planningNumber',
    },
    {
      value: 'Product',
      key: 'product',
    },
    {
      value: 'Planning Status',
      key: 'planningStatus',
    },
    {
      value: '',
      key: 'actions',
    },
  ],
  data: Array(10)
    .fill({})
    .map((item, index) => ({
      id: index + 1,
      date: '06/10/2023',
      planningNumber: '563232',
      product: 'Product 1',
      planningStatus: <span className='color-sky'>Approved</span>,
      actions: (
        <div className='planningTableActions'>
          <SmButton
            variant='small'
            theme='primary'
            title='See'
            onClick={() =>
              window.location.replace(
                '/user/plannings/patient-plan-treatments/5'
              )
            }
          />
        </div>
      ),
    })),
};

export const patientPlanTreatmentsMockData = {
  headings: [
    {
      value: 'Date',
      key: 'date',
    },
    {
      value: '',
      key: 'treatment',
    },
    {
      value: '',
      key: 'actions',
    },
  ],
  data: Array(10)
    .fill({})
    .map((item, index) => ({
      id: index + 1,
      date: '06/10/2023',
      treatment: `Treatment ${index + 1}`,
      actions: (
        <div className='planningTableActions items-start'>
          <>
            {index === 0 ? (
              <>
                <SmButton
                  variant='small'
                  theme='primary'
                  title='Report'
                  onClick={() =>
                    window.location.replace('/patient-plan-record/5')
                  }
                />
                <SmButton
                  variant='small'
                  theme='primary'
                  title='Simulation'
                  onClick={() =>
                    window.location.replace('/patient-plan-record/5')
                  }
                />
              </>
            ) : (
              <SmButton
                variant='small'
                theme='primary'
                title='See'
                onClick={() =>
                  window.location.replace('/user/plannings/plan-instructions/5')
                }
              />
            )}
          </>
        </div>
      ),
    })),
};

export const userBillingMockData = {
  headings: [
    {
      value: 'Date',
      key: 'date',
    },

    {
      value: 'Patient',
      key: 'patient',
    },
    {
      value: 'Product',
      key: 'product',
    },
    {
      value: 'Order',
      key: 'order',
    },
    {
      value: '',
      key: 'actions',
    },
  ],
  data: Array(11)
    .fill({})
    .map(() => ({
      date: '06/10/2023',
      patient: 'George Bill',
      product: 'Product 1',
      order: '523232',
      actions: (
        <div div className='planningTableActions'>
          <SmButton
            variant='small'
            theme='primary'
            title='Download'
            // onClick={() => window.location.replace("/patient-plans/5")}
          />
        </div>
      ),
    })),
};

export const userQueriesMockData = {
  headings: [
    {
      value: 'Date',
      key: 'date',
    },
    {
      value: 'Query Number',
      key: 'queryNumber',
    },
    {
      value: 'Query Subject',
      key: 'querySubject',
    },
    {
      value: '',
      key: 'actions',
    },
  ],
  data: Array(10)
    .fill({})
    .map(() => ({
      date: '06/10/2023',
      queryNumber: 'QA58',
      querySubject: 'Pending approval',
      actions: (
        <div div className='planningTableActions'>
          <SmButton
            variant='small'
            theme='primary'
            title='See'
            onClick={() => window.location.replace('/user/queries/5')}
          />
        </div>
      ),
    })),
};
export const notificationMockData = Array(4).fill(
  'User James has updated the status of patient laura follu to “planning a pending approval'
);

export const langugeMockData = {
  languages: [
    {
      value: 'English',
      key: 'en',
      img: ukFlag,
    },
    {
      value: 'Spanish',
      key: 'es',
      img: esFlag,
    },
  ],
};

export const userPendingPaymentsMockData = {
  headings: [
    {
      value: 'Date',
      key: 'date',
    },
    {
      value: '',
      key: 'instructions',
    },
    {
      value: '',
      key: 'actions',
    },
  ],
  data: Array(10)
    .fill({})
    .map(() => ({
      date: '06/10/2023',
      instructions: 'Records and written instructions',
      actions: (
        <div div className='planningTableActions'>
          <SmButton
            variant='small'
            theme='primary'
            title='See'
            onClick={() => window.location.replace('/user/plan-instructions/5')}
          />
        </div>
      ),
    })),
};
