import React from 'react';

import { Typography } from '@mycrypto/ui';
import { exportState, useSelector } from '@store';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Button, ContentPanel, Downloader, RouterLink } from '@components';
import { ROUTE_PATHS } from '@config';
import { useUserActions } from '@services/Store';
import { COLORS } from '@theme';
import translate, { translateRaw } from '@translations';
import { ACTION_NAME, ACTION_STATE } from '@types';

const CenteredContentPanel = styled(ContentPanel)`
  width: 35rem;
`;

const ImportSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CacheDisplay = styled.code`
  overflow: auto;
  width: 100%;
  height: 10rem;
`;

export function Export(props: RouteComponentProps) {
  const { history } = props;
  const onBack = history.goBack;
  const appState = useSelector(exportState);

  const { updateUserAction, findUserAction } = useUserActions();

  const backupAction = findUserAction(ACTION_NAME.BACKUP);

  return (
    <CenteredContentPanel onBack={onBack} heading={translateRaw('SETTINGS_EXPORT_HEADING')}>
      <ImportSuccessContainer>
        <Typography>{translate('SETTINGS_EXPORT_INFO')}</Typography>
        <CacheDisplay data-testid="export-json-display">{appState}</CacheDisplay>
        <RouterLink fullwidth={true} to={ROUTE_PATHS.SETTINGS.path}>
          <Button color={COLORS.WHITE} fullwidth={true}>
            {translate('SETTINGS_EXPORT_LEAVE')}
          </Button>
        </RouterLink>
        <Downloader
          data={appState}
          onClick={() =>
            backupAction &&
            updateUserAction(backupAction.uuid, { ...backupAction, state: ACTION_STATE.COMPLETED })
          }
        />
      </ImportSuccessContainer>
    </CenteredContentPanel>
  );
}

export default withRouter(Export);
