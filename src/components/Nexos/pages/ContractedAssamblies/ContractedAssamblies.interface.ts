export interface ContractedAssambliesUI {
    id:                        number;
    residential_id:            number;
    name:                      string;
    date:                      Date;
    max_agents:                number;
    max_units:                 number;
    status_id:                 number;
    date_started:              string;
    quorum_started:            null;
    meeting_time:              string;
    is_online:                 number;
    accept_register:           number;
    youtube_link:              string;
    youtube_share:             string;
    zoom_link:                 string;
    meeting_status:            number;
    support:                   string;
    enable_chat:               number;
    has_desktop:               number;
    pasword_meeting:           string;
    show_results:              number;
    limit_aporte:              number;
    limit_amount:              string;
    voted_email:               number;
    status:                    string;
    meeting_type:              string;
    end_session_time:          number;
    quorum_real_time:          number;
    status_preregister:        number;
    meeting_time_start:        string;
    meeting_location:          null;
    request_signin_code:       number;
    limit_request_by_user:     number;
    email_request_password_id: number;
    limit_raising_by_customer: number;
    residential_name:          string;
    nit:                       string;
    contact_person:            string;
    contact_phone:             string;
}


export interface MeetingTypeUI {
    name: string;
    total: number;
}