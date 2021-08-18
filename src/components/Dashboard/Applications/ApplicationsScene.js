import React, {useEffect} from 'react';
import PermRender from '../../_common/PermRender';
import {Query} from "react-apollo";
import * as queries from "../../../apollo/queries";
import LoadingIcon from "../../_presentational/LoadingIcon";
import { Container } from 'reactstrap';
import ApplyNow from "../../_common/ApplyNow"
import ApplicationsTable from "./ApplicationsTable"
import SearchUserDetails from "./SearchUserDetails"

const ApplicationsScene = () => {

    useEffect(() => {
        document.title = `RC - Applications`
    }, [])

    return (
        <Query query={queries.GET_AUTH_USER}>
        {
            ({loading, error, data}) => {
                if (loading) return <LoadingIcon sizeClass={'glimpsicon-32'} />
                if (error) {
                    return null
                }
                const {authorizedUser} = data

                return (
                <Container>
                    <PermRender perms={[3,2]} authorizedUser={authorizedUser}>
                        <h1>Applications</h1>
                        <ApplicationsTable />
                        <SearchUserDetails />
                    </PermRender>
                    <PermRender perms={[0]} authorizedUser={authorizedUser}>
                        <ApplyNow />
                    </PermRender>
                </Container>
                )
            }
        }
        </Query>
    )
}

export default ApplicationsScene
