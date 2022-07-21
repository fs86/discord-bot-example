import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Button, InfoIcon, Input, TextArea } from '@components';
import { ChannelSelection } from '@components/ChannelSelection';
import { useGuildSelection } from '@context-providers';
import { getGuildSettings, updateGuildSettings } from '@services/guildService';
import { GuildSettings } from '@viewmodels';
import { message, Tooltip } from 'antd';
import { Formik } from 'formik';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`;

const Headline = styled.h2`
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 2rem;
`;

const SaveButton = styled(Button)`
  margin-top: 1rem;
`;

const UserProperty = styled.div`
  display: flex;
  line-height: 22px;
  margin-bottom: 0.1rem;
  gap: 0.3rem;
`;

const Placeholder = styled.span`
  font-family: 'Courier New', Courier, monospace;
  background-color: #464646;
  border-radius: 3px;
`;

const Description = styled.span``;

const CommonUserMessagePlaceholders = () => {
  return (
    <>
      <UserProperty>
        <Placeholder>{'{member_name}'}</Placeholder>
        <Description>Name des Members</Description>
      </UserProperty>
      <UserProperty>
        <Placeholder>{'{guild_name}'}</Placeholder>
        <Description>Name des Servers</Description>
      </UserProperty>
    </>
  );
};

export function GuildSettingsPageBotTab() {
  const { t } = useTranslation('guildSettingsPageBotTab');
  const { selectedGuild } = useGuildSelection();

  const { isLoading, data } = useQuery(['getGuildSettings', selectedGuild?.id], () =>
    selectedGuild?.id ? getGuildSettings(selectedGuild.id) : undefined
  );

  async function handleOnSubmit(settings: GuildSettings) {
    if (!selectedGuild) {
      return;
    }

    const result = await updateGuildSettings(selectedGuild.id, settings);

    if (result.status === 200) {
      message.success(t('successMessage', { guildName: selectedGuild?.name }));
    } else {
      message.error(t('errorMessage', { guildName: selectedGuild?.name }));
    }
  }

  return (
    <>
      {!isLoading && (
        <Formik
          enableReinitialize
          onSubmit={handleOnSubmit}
          initialValues={
            {
              botPrefix: data?.botPrefix,
              botNickname: data?.botNickname,
              blacklist: data?.blacklist,
              welcomeChannelId: data?.welcomeChannelId,
              welcomeMessage: data?.welcomeMessage,
              leaveChannelId: data?.leaveChannelId,
              leaveMessage: data?.leaveMessage,
            } as GuildSettings
          }
        >
          {({ values: guildSettings, handleSubmit, handleChange, setFieldValue }) => {
            console.log(guildSettings.blacklist);
            return (
              <form onSubmit={handleSubmit}>
                <Wrapper>
                  <div>
                    <Headline>{t('general.title')}</Headline>
                    <Input
                      id="botPrefix"
                      addonBefore={t('general.prefixLabel')}
                      onChange={handleChange}
                      value={guildSettings?.botPrefix}
                    />
                    <Input
                      id="botNickname"
                      addonBefore={t('general.nicknameLabel')}
                      value={guildSettings?.botNickname}
                      onChange={handleChange}
                    />
                    <Headline>
                      Blacklist
                      <InfoIcon
                        content="Benutzer in dieser Liste können nicht mit dem Bot interagieren. Eine ID pro Zeile."
                        size={14}
                      />
                    </Headline>
                    <TextArea
                      id="blacklist"
                      value={guildSettings.blacklist?.join('\r\n')}
                      onChange={(event) =>
                        setFieldValue('blacklist', event.target.value.split('\r\n'))
                      }
                      rows={8}
                    />
                  </div>
                  <div>
                    <Headline>
                      {t('welcome.title')}
                      <InfoIcon
                        title="Verfügbare Platzhalter für die Willkommensnachricht"
                        content={<CommonUserMessagePlaceholders />}
                        size={14}
                      />
                    </Headline>
                    <ChannelSelection
                      id="welcomeChannelId"
                      guildId={selectedGuild?.id}
                      addonBefore={t('welcome.channelLabel')}
                      placeholder={t('welcome.channelPlaceholder')}
                      value={guildSettings?.welcomeChannelId}
                      onChange={(value) => setFieldValue('welcomeChannelId', value)}
                    />
                    <TextArea
                      id="welcomeMessage"
                      value={guildSettings?.welcomeMessage}
                      onChange={handleChange}
                    />
                    <Headline>
                      {t('leave.title')}{' '}
                      <InfoIcon
                        title="Verfügbare Platzhalter für die Abschiedsnachricht"
                        content={<CommonUserMessagePlaceholders />}
                        size={14}
                      />
                    </Headline>
                    <ChannelSelection
                      id="leaveChannelId"
                      guildId={selectedGuild?.id}
                      addonBefore={t('leave.channelLabel')}
                      placeholder={t('leave.channelPlaceholder')}
                      value={guildSettings?.leaveChannelId}
                      onChange={(value) => setFieldValue('leaveChannelId', value)}
                    />
                    <TextArea
                      id="leaveMessage"
                      value={guildSettings?.leaveMessage}
                      onChange={handleChange}
                      footer={
                        <>
                          {/* <Tooltip title="test">
                            <PlaceholderInfo>test</PlaceholderInfo>
                          </Tooltip> */}

                          {/* <UserProperty>
                            <Placeholder>{'{name}'}</Placeholder>
                            <Description>Name des Members</Description>
                          </UserProperty> */}
                        </>
                      }
                    />
                  </div>
                </Wrapper>
                <Buttons>
                  <SaveButton type="primary" submit>
                    {t('saveButton')}
                  </SaveButton>
                </Buttons>
              </form>
            );
          }}
        </Formik>
      )}
    </>
  );
}
