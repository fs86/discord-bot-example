import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { Button, InfoIcon, Input, TextArea } from '@components';
import { ChannelSelection } from '@components/ChannelSelection';
import { useGuildSelection } from '@context-providers';
import { getGuildSettings, updateGuildSettings } from '@services/guildService';
import { GuildSettings } from '@viewmodels';
import { message } from 'antd';
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

    result.status === 200
      ? message.success(t('successMessage', { guildName: selectedGuild?.name }))
      : message.error(t('errorMessage', { guildName: selectedGuild?.name }));
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
            return (
              <form onSubmit={handleSubmit}>
                <Wrapper>
                  <div>
                    <Headline>{t('general.title')}</Headline>
                    <Input
                      id="botPrefix"
                      addonBefore={t('general.prefixLabel')}
                      value={guildSettings?.botPrefix}
                      onChange={handleChange}
                    />
                    <Input
                      id="botNickname"
                      addonBefore={t('general.nicknameLabel')}
                      value={guildSettings?.botNickname}
                      onChange={handleChange}
                    />
                    <Headline>
                      {t('blacklist.title')}
                      <InfoIcon content={t('blacklist.info')} size={14} />
                    </Headline>
                    <TextArea
                      id="blacklist"
                      rows={8}
                      value={guildSettings.blacklist?.join('\n')}
                      onChange={(event) => {
                        const value = event.target.value
                          .split('\n')
                          .filter((element) => element !== '');

                        setFieldValue('blacklist', value);
                      }}
                    />
                  </div>
                  <div>
                    <Headline>
                      {t('welcome.title')}
                      <InfoIcon
                        title={t('welcome.info.title')}
                        size={14}
                        content={
                          <>
                            <UserProperty>
                              <Placeholder>{'{member_name}'}</Placeholder>
                              <Description>{t('welcome.info.content.memberName')}</Description>
                            </UserProperty>
                            <UserProperty>
                              <Placeholder>{'{member_mention}'}</Placeholder>
                              <Description>{t('welcome.info.content.memberMention')}</Description>
                            </UserProperty>
                            <UserProperty>
                              <Placeholder>{'{guild_name}'}</Placeholder>
                              <Description>{t('welcome.info.content.guildName')}</Description>
                            </UserProperty>
                          </>
                        }
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
                        title={t('leave.info.title')}
                        size={14}
                        content={
                          <>
                            <UserProperty>
                              <Placeholder>{'{member_name}'}</Placeholder>
                              <Description>{t('leave.info.content.memberName')}</Description>
                            </UserProperty>
                            <UserProperty>
                              <Placeholder>{'{guild_name}'}</Placeholder>
                              <Description>{t('leave.info.content.guildName')}</Description>
                            </UserProperty>
                          </>
                        }
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
