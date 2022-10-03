import axios from 'axios';
import {ETRO_API} from '../config';
import {SGHJob} from '../types/jobList.types';

export class Jobs {
    getJobs = async (): Promise<SGHJob[] | undefined> => {
        try {
            return axios
                .get(ETRO_API + `/jobs/`)
                .then((response) => {
                    const jobList = response.data;
                    const jobs: SGHJob[] = [];
                    jobList.forEach((j: SGHJob) => {
                        const job: SGHJob = {
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
                    return {success: false, data: ''};
                });
        } catch (error: any) {
            return error;
        }
    };
}
