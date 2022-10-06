import axios from 'axios';

import { ETRO_API } from '../config';
import { Job } from './jobs.types';

export const getJobs = async (): Promise<Job[] | undefined> => {
    try {
        return axios
            .get(ETRO_API + `/jobs/`)
            .then((response) => {
                const jobList = response.data;
                const jobs: Job[] = [];
                jobList.forEach((j: Job) => {
                    const job: Job = {
                        id: j.id,
                        abbrev: j.abbrev,
                        name: j.name,
                        iconPath: j.iconPath
                    };
                    jobs.push(job);
                });
                response.data = jobs;
                return response.data;
            })

            .catch((error: any) => {
                console.log('getJobs', error);
                return {success: false, data: error};
            });
    } catch (error: any) {
        return error;
    }
};
